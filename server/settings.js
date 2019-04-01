
module.exports = {
    firebase: {
        apiKey: process.env.API_KEY || "AIzaSyBNQXjYM9AMEsSfc8e6DzgYWAkbP9VzKEM",
        authDomain: process.env.PROJECT_ID || "river-watcher.firebaseapp.com",
        databaseURL: process.env.DB_NAME || "https://river-watcher.firebaseio.com",
        storageBucket: process.env.STORAGE_BUCKET || "river-watcher.appspot.com",
        projectId: "river-watcher",
        messagingSenderId: "865350210163"
    },

    mqtt: { 
        host: process.env.MQTT_HOST || 'eu.thethings.network',
        appId: process.env.MQTT_APP_ID || 'kentwatersensors',
        accessKey: process.env.MQTT_ACCESS_KEY || 'ttn-account-v2.mRzaS7HOchwKsQxdj1zD-KwjxXAptb7s9pca78Nv7_U'
    },

    governmentApi: {
        baseUri: process.env.GOVERNMENT_API_URI ||  'https://environment.data.gov.uk/flood-monitoring/',
        updateRate: process.env.GOVERNMENT_UPDATE_RATE || 15*3600*1000
    }
};