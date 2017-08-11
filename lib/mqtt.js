
module.exports = () => {
        const Sonar = require('raspi-sonar').Sonar
        const mqtt = require('mqtt')
        var debug = require('debug')('tank:server');
        var sonarPin1 = new Sonar(1)
        var client = mqtt.connect('mqtt://skade.local:1883', {username: 'sensor', password: 'Hersareading'})

        client.on('connect', () => {
                debug('MQTT connection successful')
        })

        setInterval(() => {
                sonarPin1.read( (duration)=> {
                        var dist = (343.0 * duration / 1000000 * 0.5).toFixed(2)
                        var vol = ((2.2 - dist) * (1.65 * 1.65) * Math.PI * 1000).toFixed(3)
                        client.publish('tank/volume', vol.toString())
                                .publish('tank/distance', dist.toString());
                        })
        }, 300000)
}