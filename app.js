var restify = require('restify');
var builder = require('botbuilder');
dialogs  = require('./dialogs');
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
server.get('/health', function( req, res ) {
	res.send();
    });
// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector);


bot.dialog('/firstRun', dialogs.firstRun);

// Install First Run middleware and dialog
bot.use(builder.Middleware.firstRun({ version: 1.0, dialogId: '*:/saludoInicial' }));