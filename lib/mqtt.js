const Sonar = require('raspi-sonar').Sonar
const mqtt = require('mqtt')
var sonarPin1 = new Sonar(1)
var client = mqtt.connect([{ host: 'skade.local', post: 1883 }], {username: 'sensor', password: 'Hersareading'})

/*
 publish.multiple(msgs, hostname='skade.local', port="1883", auth={'username': "sensor", 'password':"Hersareading"})
*/
console.log('Starting forked process ...');
setInterval(() => {
   sonarPin1.read( (duration)=> {
        var dist = (343.0 * duration / 1000000 * 0.5).toFixed(2)
        var vol = ((2.2 - dist) * (1.65 * 1.65) * Math.PI * 1000).toFixed(3)
        client.publish('tank/volume', vol.toString())
                .publish('tank/distance', dist.toString());
	})
}, 10000)
