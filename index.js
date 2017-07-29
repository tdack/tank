const express = require('express')
const Sonar = require('raspi-sonar').Sonar
const app = express()
const port = 3456

var sonarPin1 = new Sonar(1)

app.get('/distance', (req, res) => {
	console.log(req.url);
	sonarPin1.read( (duration)=> {
		var distance = 343.0 * duration / 1000000 * 0.5
		res.send('' + distance)
		})
})


app.listen(port, (err) => {
	if (err) {
		return console.log('Error:', err)
	}
	console.log('server started on port ' + port)
})


