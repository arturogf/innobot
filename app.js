var restify = require('restify');
var builder = require('botbuilder');
config   = require('./config');

// Setup Restify Server
const server = restify.createServer();
const port   = (process.env.PORT || config.SERVER_PORT);
const ip     = (process.env.IP || config.IP);
server.listen(port, ip, function() {
	console.log('%s listening to %s', server.name, server.url);
    });

//var server = restify.createServer();
//server.listen(process.env.port || process.env.PORT || 3978, function () {
//	console.log('%s listening to %s', server.name, server.url); 
//    });

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
	appId: process.env.MICROSOFT_APP_ID,
	appPassword: process.env.MICROSOFT_APP_PASSWORD
    });

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
	session.send("¡Buenos días INNOVADOR(A)! Soy innobot, el chatbot de la Unidad de Innovación del Hospital Clínico San Carlos");
	session.send("Si tienes una idea original u proyecto innovador mejoraría la calidad de vida, la vivencia de la enfermedad, la experiencia asistencial o cualquier otro aspecto, cuéntanosla. Este es tu lugar. Trabajamos para ti.")
	//session.send("Has dicho: %s", session.message.text);
    });