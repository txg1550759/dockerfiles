/**
 * (c) 2015 Yolean AB
 */

var app = require('./app');
var log = require('./log');
var settings = require('./settings.json');

app.listen(settings.port);
log.info('Listening to port ' + settings.port);
