/**
 * (c) 2015 Yolean AB
 */

var INVALID_REQUEST = 400;

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var EventEmitter = require('events').EventEmitter;
var events = new EventEmitter();

var log = require('./log');

app.use(bodyParser.json());

app.get('/ping', function (req, res) {
log.info('Received ping from IP: ' + req.connection.remoteAddress);
res.send('pong');
});

app.post('/poll', function (req, res) {
log.debug('/poll with payload: ' + JSON.stringify(req.body));
var secret = req.body.secret;
var isRetry = req.body.isRetry;

if (!secret) {
log.info('/poll Needs a secret in its payload: ' + JSON.stringify(req.body));
return res.sendStatus(INVALID_REQUEST);
}

var listeners = events.listeners(secret);
log.debug('listeners', listeners);
var secretInUse = listeners.length > 0;
if (secretInUse) {
if (!isRetry) {
log.info('Poll denied, invalid secret: ' + secret);
return res.status(INVALID_REQUEST).send({ error: 'Invalid secret' });
}
events.removeAllListeners(secret);
}

events.once(secret, res.send.bind(res));
});

app.post('/message', function (req, res) {
log.debug('/message with payload: ' + JSON.stringify(req.body));
var secret = req.body.secret;
var message = req.body.message;
var nick = req.body.nick;

if (!secret) {
log.info('Message denied, no secret provided');
return res.sendStatus(INVALID_REQUEST);
}

var secretExists = events.listeners(secret).length === 1;
if (!secretExists) {
log.debug('Message denied, secret unknown. nListeners: ' + events.listeners(secret).length);
return res.status(INVALID_REQUEST).send({ error: 'Invalid secret' });
}

events.emit(secret, {
message: message,
nick: nick
});

res.sendStatus(200);
});

module.exports = app;
