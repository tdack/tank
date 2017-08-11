const Sonar = require('raspi-sonar').Sonar
var sonarPin1 = new Sonar(1)

console.log('Starting forked process ...');
setInterval(() => {
   sonarPin1.read( (duration)=> {
        var dist = (343.0 * duration / 1000000 * 0.5).toFixed(2)
        var vol = ((2.2 - dist) * (1.65 * 1.65) * Math.PI * 1000).toFixed(3)
        console.log('Forked process .... Distance:4 ' + dist + ' Volume: ' + vol);
	})
}, 10000);
