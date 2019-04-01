const moment = require('moment');

var story = [
    {
        riverDepth: 1.395,
        distanceFromFlooding: 0.3        
    },

    {
        riverDepth: 1.495,
        distanceFromFlooding: 0.2
    },
    
    {
        riverDepth: 1.645,
        distanceFromFlooding: 0.05    
    },
    
    {
        riverDepth: 1.745,
        distanceFromFlooding: -0.05
    },
    
    {
        riverDepth: 1.645,
        distanceFromFlooding: 0.05
    },
    
    {
        riverDepth: 1.545,
        distanceFromFlooding: 0.15
    },    
    
    {
        riverDepth: 1.445,
        distanceFromFlooding: 0.25
    },       
    
    {
        riverDepth: 1.445,
        distanceFromFlooding: 0.25
    },           

    {
        riverDepth: 1.445,
        distanceFromFlooding: 0.25
    },               
]
var getData = idx => ({
    metadata: {
        sensorId: 'lairdc0ee400001012345',
        date: moment().toISOString(),
        altitude: 8,
        latitude: 51.281,
        longitude: 1.0742298,        
    },
    ...story[idx]
})

module.exports = (mqtt, delay) => {
    for (let idx = 0; idx < story.length; idx++) {
        setTimeout(() => mqtt.onNewReading(getData(idx)), idx * delay)
    }
}
