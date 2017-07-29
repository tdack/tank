const express = require('express')
const Sonar = require('raspi-sonar').Sonar
const app = express()
const port = 3456

var sonarPin1 = new Sonar(1)

app.listen(port, (err) => {
	if (err) {
		return console.log('Error:', err)
	}
	console.log('server started on port ' + port)
})


