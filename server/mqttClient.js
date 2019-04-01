const moment = require('moment')
const { data } = require("ttn")

const sensorMetadata = {
    "lairdc0ee4000010109f3": {
        "distance_sensor_from_river_bed": 1820,
        "distance_flood_plain_from_riv, per_bed": 1820
    },
    "lairdc0ee400001012345": {
        "distance_sensor_from_river_bed": 13420,
        "distance_flood_plain_from_river_bed": 1200
    },
}

// eaRegionName = Southern
// area name : Southern - Kent and South London
// river Great Stour

function MQTTClient({ host, appId, accessKey }) {
    // Current floodings by areaId
    this.lastFloodings = {}
    const handlers = {
        sensorReading: null,
        sensorEvent: null
    };

    this.on = (event, handler) => handlers[event] = handler;
    this.trigger = (event, value) => {
        if (event == 'sensorReading') {
            return handlers[event] && handlers[event](value)
        }
        const updateHistory = (value) => {
            if (value.noFlooding) {
                return
            }
            var lastEvent = this.lastFloodings[value.floodArea.notation]
            if (!lastEvent) {
                // Insert event
                this.lastFloodings[value.floodArea.notation] = {...value}
                return
            }

            // If severityLevel hasnt changed, reset to the last datetime
            if (value.severityLevel == lastEvent.severityLevel) {
                value.timeSeverityChanged = lastEvent.timeSeverityChanged
                value.timeMessageChanged = lastEvent.timeMessageChanged
                return
            }
            // severity just changed, update history
            lastEvent.severityLevel = value.severityLevel
            lastEvent.timeSeverityChanged = value.timeSeverityChanged
            lastEvent.timeMessageChanged = value.timeMessageChanged                    
        }

        // Update raised & last modified datetimes
        if (value.floodArea.notation in this.lastFloodings) {
            var lastEvent = this.lastFloodings[value.floodArea.notation]
            value.timeRaised = lastEvent.timeRaised

            // flood has ended ; set level 4 if not yet done or juste remove the event after 1 hr
            if (value.noFlooding) {
                // How much time since the last severity change ?
                var elapsedTime = moment.duration(moment(value.timeSeverityChanged).diff(lastEvent.timeSeverityChanged)).asMinutes()
                if (elapsedTime > 30) { // delete event
                    delete this.lastFloodings[value.floodArea.notation]
                    return handlers[event] && handlers[event](value)
                }

                value = {
                    ...lastEvent,
                    severityLevel: 4,
                    severity: "The warning is no longer in force",
                }
            }
        }     
        // Whether flooding or not, update history 
        updateHistory(value)
        return handlers[event] && handlers[event](value)
    }

    this.onNewReading = ({ riverDepth, distanceFromFlooding, metadata }) => {
        this.trigger('sensorReading', {
            ...metadata,
            type: 'level',
            value: riverDepth
        })

        var flooding = {
            severityLevel: 0,
            severity: ""
        }

        const areaId = (metadata.latitude + ',' + metadata.longitude)
                .replace('.', '').replace('.', '')

        if (distanceFromFlooding < 0) {
            flooding.severity = "Severe Flooding, Danger to Life."
            flooding.severityLevel = 1
        } else if (distanceFromFlooding <= 0.05) {
            flooding.severity = "Flooding is Expected, Immediate Action Required."
            flooding.severityLevel = 2
        } else if (distanceFromFlooding <= 0.2) {
            flooding.severity = "Flooding is Possible, Be Prepared."
            flooding.severityLevel = 3
        }

        if (flooding.severityLevel) {
            this.trigger('sensorEvent', {
                "eaAreaName" : "Southern - Kent and South London",
                "eaRegionName" : "Southern" ,
                "floodArea" : { 
                  "notation" : areaId,
                  "riverOrSea" : "Great Stour"
                }
                 ,
                "floodAreaID" : areaId,
                "timeMessageChanged" : moment().toISOString(),
                "timeRaised" : moment().toISOString(),
                "timeSeverityChanged" : moment().toISOString(),
                "sensorId": metadata.sensorId,
                ...flooding
            })
        } else {
            // Tricks to get caller function delete any previously stored event
            this.trigger('sensorEvent', {
                "noFlooding": true,
                "floodArea": { "notation": areaId }
            })
        }
    }
    
    this.start = () => {
        data(appId, accessKey)
        .then(client => {
          client.on("uplink", (devID, payload) => {    
            const distanceToSurface = parseInt(Buffer.from(payload.payload_raw, 'base64').toString('hex'), 16)
            const riverDepth = sensorMetadata[devID]['distance_sensor_from_river_bed'] - distanceToSurface
            const distanceFromFlooding = sensorMetadata[devID]['distance_flood_plain_from_river_bed'] - riverDepth
    
            const metadata = {
                sensorId: devID,
                date: payload.metadata.time,
                altitude: payload.metadata.altitude,
                latitude: payload.metadata.latitude,
                longitude: payload.metadata.longitude
            }

            this.onNewReading({
                riverDepth: riverDepth / 1000,
                distanceFromFlooding: distanceFromFlooding / 1000,
                metadata
            })
          })
        })
        .catch(function (err) {
          console.error(err)
          process.exit(1)
        })        
    }    
}

module.exports = MQTTClient