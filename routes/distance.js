var express = require('express');
var router = express.Router();

const Sonar = require('raspi-sonar').Sonar
var sonarPin1 = new Sonar(1)

/* GET distance  */
router.get('/', function(req, res, next) {
    sonarPin1.read( (duration)=> {
        var dist = 343.0 * duration / 1000000 * 0.5
        var vol = (2.2 - dist) * (1.65 * 1.65) * Math.PI * 1000
	console.log(vol)
        res.send({
            title: 'Distance',
            distance: dist,
            volume: vol.toFixed(3)
	})
    });
});

module.exports = router;
