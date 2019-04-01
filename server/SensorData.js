
function SensorReading({
    date, sensorId, altitude,
    latitude, longitude, type, value, unitName
}) {
    this.date = date
    this.sensorId = sensorId
    this.altitude = altitude || null
    this.latitude = latitude
    this.longitude = longitude
    this.type = type
    this.value = value
}

function SensorEvent({
    date, sensorId, altitude,
    latitude, longitude, type, payload
}) {
    this.date = date
    this.sensorId = sensorId
    this.altitude = altitude
    this.latitude = latitude
    this.longitude = longitude
    this.type = type
    this.payload = payload
}

module.exports = { SensorReading, SensorEvent }