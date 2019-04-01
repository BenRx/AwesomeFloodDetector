const rp = require('request-promise');
const moment = require('moment')

const request = uri => rp({
    uri,
    json: true
})

function RiverGovernmentAPI({ baseUri }) {
    const endpoints = {
        fetchStations: baseUri + 'id/stations?riverName=Great Stour',
        fetchEvents: baseUri + 'id/floods'
    };

    function Station({ RLOIid, lat, long, measures }) { 
        this.id = RLOIid
        this.lat = lat
        this.long = long
        this.measures = measures.map(cur => ({
            fetchUri: cur['@id'],
            type: cur['parameter'],
            qualifier: cur['qualifier'],
            unitName: cur['unitName']
        }))

        this.fetchReadings = () => {
            return Promise.all(
                // Each measures
                this.measures.map(({ fetchUri, type }) => 
                    // Each readings
                    request(fetchUri + '/readings?_sorted&latest')
                    .then(({ items }) => {
                        return items.map(({ dateTime, value }) => ({
                            sensorId: this.id,
                            date: dateTime,
                            latitude: this.lat,
                            longitude: this.long,
                            type: type, // level, flow, wind, temperature
                            value
                        }))
                    })
                    .catch(error => {})
                )
            )
            .then(readings => [].concat.apply([], readings))  
        }
    }

    this.fetchReadings = () => {
        return this.fetchStations()
            // Fetch readings of each stations
            .then(stations => {
                return Promise.all(stations.map(cur => cur.fetchReadings()))
            })
            // Flatten array of arrays
            .then(readings => [].concat.apply([], readings))
    }

    this.fetchStations = () => {
        return request(endpoints.fetchStations)
        .then(stations => stations.items.map(station => new Station(station)))
        .catch(error => {
            console.log('Error : Government seems unavailable')
            console.log(error)            
        })        
    }

    this.fetchEvents = () => {
        return request(endpoints.fetchEvents)
            .then(events => events.items.map(cur => ({...cur, sensorId: "government"})))
    }

    this.fetch = () => {
        return Promise.all([
            this.fetchReadings(),
            this.fetchEvents()
        ])
        .then(([ readings, events ]) => ({
            readings,
            events
        }))
    }
}

module.exports = RiverGovernmentAPI