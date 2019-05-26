const express = require('express');
const request = require('request');
const bodyParser = require('body-parser'); 
const app = express();
const port = 8080; 

const config = require('./config.json');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.listen(port, () =>  {
	console.log(`App listening on port ${port}!`)
});

app.get('/', (req, res) => {
	
	
	res.send('Welcome to Node-Express-Guggy-Rest-Api')
});


app.post('/guggy', (req, res) => {
	
	let sentence = req.body.text; 
	
	request.post({
		'headers': { 'content-type': 'application/json', 'apiKey' : config.apikey },
		'url' : 'http://text2gif.guggy.com/v2/guggify', 
		'body': JSON.stringify({
			'sentence':  sentence,
			'lang': 'ru'
		})
	},(error, response, body) => {
		if(error) {
			res.send(error)
		}
		var jsonContent = JSON.parse(body);
		
		console.log('Response Code from guggy for sentence "' + sentence + '" is ' + response.statusCode);
		res.send(jsonContent.animated[0].gif.hires.url);
	});
});
		
