
// module.exports = (input, done) => {
        const Sonar = require('raspi-sonar').Sonar
        const mqtt = require('mqtt')
        var debug = require('debug')('tank:mqtt');
        var sonarPin1 = new Sonar(1)
        var client = mqtt.connect('mqtt://skade.local:1883', {username: 'sensor', password: 'Hersareading'})

        debug('Thread started')
        
        client.on('connect', () => {
                debug('Connection successful')
        })

        setInterval(() => {
                sonarPin1.read( (duration)=> {
                        var dist = (343.0 * duration / 1000000 * 0.5).toFixed(2)
                        var vol = ((2.2 - dist) * (1.65 * 1.65) * Math.PI * 1000).toFixed(3)
                        debug('distance: %d', dist)
                        debug('volume: %d', vol)
                        client.publish('tank/volume', vol.toString(), {retain: true})
                                .publish('tank/distance', dist.toString(), {retain: true});
                        })
        }, 300000)
// }