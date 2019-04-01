const settings = require("./settings");
const moment = require('moment');
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())

const MQTTClient = require('./mqttClient');
const mqttFloodingSimulation = require('./mocks/mqttFlooding');
const RiverGovernmentAPI = require('./RiverGovernmentAPI');

firebase.initializeApp(settings.firebase);
var database = firebase.database();

// MQTT Client
var mqtt = new MQTTClient(settings.mqtt);
mqtt.on('sensorReading', data => readingHandler([data], 'mqtt'))
mqtt.on('sensorEvent', data => eventHandler([data], 'mqtt'))


app.get('/', function (req, res) {
    mqttFloodingSimulation(mqtt, 10000)
    res.status(200).send("Running tests ...");
})

app.listen(3001, function () {
  console.log('Testing server listening on port 3000 !')
})

// Government API
var govAPI = new RiverGovernmentAPI(settings.governmentApi)
setInterval(fetchGovernmentData, settings.governmentApi.updateRate);

function fetchGovernmentData() {
    govAPI.fetch()
    .then(({ readings, events }) => {
        eventHandler(events, 'government')
        readingHandler(readings, 'government')
    })
}

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
    if (provider == 'mqtt') {
        await database.ref('floods/' + events[0].floodArea.notation).remove()
        if (events[0].noFlooding) {
            return
        }
    } else { // Replace every old events with those ones
        await database.ref('floods')
            .once('value')
            .then(docs => {
                docs.forEach(doc => {
                    if (doc.val().sensorId == "government") {
                        doc.ref.remove()
                    }
                })
            })
    }

    events.map(cur => {
        database.ref(`floods/${cur.floodArea.notation}`)
                .set(cur)
    })    
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
