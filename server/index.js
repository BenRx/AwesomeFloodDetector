const apiSettings = require("./settings/api");
const moment = require('moment');
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
const admin = require("firebase-admin");
const express = require('express')
const https = require('https');
const fs = require('fs');
const cors = require('cors')
const nodemailer = require('nodemailer');
const MQTTClient = require('./mqttClient');
const mqttFloodingSimulation = require('./mocks/mqttFlooding');
const RiverGovernmentAPI = require('./RiverGovernmentAPI');

// Initializing db connection
firebase.initializeApp(apiSettings.firebase);
var database = firebase.database();
// Initializing admin sdk
admin.initializeApp({
    credential: admin.credential.cert(require("./settings/firebase-admin.json")),
    databaseURL: "https://river-watcher.firebaseio.com"
});  

// MQTT Client
var mqtt = new MQTTClient(apiSettings.mqtt);
mqtt.on('sensorReading', data => readingHandler([data], 'mqtt'))
mqtt.on('sensorEvent', data => eventHandler([data], 'mqtt'))

// Government API
var govAPI = new RiverGovernmentAPI(apiSettings.governmentApi)
setInterval(fetchGovernmentData, apiSettings.governmentApi.updateRate);

function fetchGovernmentData() {
    govAPI.fetch()
    .then(({ readings, events }) => {
        eventHandler(events, 'government')
        readingHandler(readings, 'government')
    })
}

// Fetch current sensors status so that we do not insert same data twice
var sensors = { }
database.ref('sensors')
    .once('value')
    .then(data => {
        sensors = data.val()
        start()
    })

function start() {
    mqtt.start()
    fetchGovernmentData()
}

/*
 * readings & events handler (push data to firestore)
 */
async function eventHandler(events, provider) {
    console.log("New events from " + provider, events)
    // contains already existing events' id
    var oldEvents = []
    // Replace every old events with those ones
    await database.ref('floods')
        .once('value')
        .then(docs => {
            docs.forEach(doc => {
                const data = doc.val()
                oldEvents.push(data.floodArea.notation + data.severityLevel)
                if ((provider == 'government' && data.sensorId == "government") || 
                    (provider == 'mqtt' && data.sensorId == events[0].sensorId)
                ) {
                    doc.ref.remove()
                }
            })
        })

    if (provider == 'mqtt' && events[0].noFlooding) {
        return
    }

    
    // List of new events to be notified
    const newEvents = []
    events.map(cur => {
        // Push it
        database.ref(`floods/${cur.floodArea.notation}`).set(cur)
        // Store new events to be notified
        if (!oldEvents.includes(cur.floodArea.notation + cur.severityLevel) && cur.severityLevel != 4) {
            newEvents.push(cur)
        }
    })
    
    if (newEvents.length) {
        notifyEvents(newEvents)
    }
}

function readingHandler(readings, provider) {
    console.log('New readings from ' + provider, readings)
    readings.map(cur => {
        // Do not insert twice same data
        if (cur.sensorId in sensors && sensors[cur.sensorId].date == cur.date) {
            return
        }
        sensors[cur.sensorId] = cur

        const day = moment(cur.date).format('Y-MM-DD')
        database.ref(`sensors_history/${cur.sensorId}/${day}`)
                .push()
                .set(cur)

        database.ref(`sensors/${cur.sensorId}`).set(cur)
    })
}

// Express test mode callback
const app = express()
app.use(cors())
app.get('/', function (req, res) {
    mqttFloodingSimulation(mqtt, 10000)
    res.status(200).send("Running tests ...");
})

https.createServer({
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem'),
    passphrase: 'casserdesculs'
}, app).listen(3001, () => console.log('Listening on port 3001'));

// Mailing feature
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: apiSettings.gmail
});
  
function getMailingList() {
    return database.ref('users')
        .once('value')
        .then(ret => Object.values(ret.val()))
        .then(docs =>
            docs.map(({ email, favList }) => ({ email, favList }))
        )
}

function formatEmailContent(events) {
    var text = "Hello, \n " + events.length + " sensors you have subscribed to raised an event : \n "
    text += events.reduce((txt, curEvent) =>
        txt + `\n\t- ${curEvent.eaAreaName} (Sensor ${curEvent.sensorId}) : ${curEvent.severity}`
    , "")

    return text
}

async function notifyEvents(events) {
    if (!events.length) {
        return
    }
    const subscriptions = await getMailingList()
    var mailOptions = {
        from: 'awesomeflooddetector@gmail.com',
        to: 'myfriend@yahoo.com',
        subject: 'New flood detected'
      };
      subscriptions.forEach(user => {
          if (!user || !user.email || !user.favList || !user.favList.length) {
              return
          }
          mailOptions.to = user.email
          const subscribedEvents = events.filter(cur => user.favList.includes(cur.sensorId))
          if (!subscribedEvents.length) {
              return
          }
          mailOptions.text = formatEmailContent(subscribedEvents)
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });     
      })
}
