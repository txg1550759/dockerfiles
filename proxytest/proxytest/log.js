/**
 * (c) 2015 Yolean AB
 */

var bunyan = require('bunyan');

var log = bunyan.createLogger({
name: 'yolean-proxy',
src: true,
streams: [
{
level: 'debug',
stream: process.stdout
},
{
level: 'debug',
path: 'yolean-proxy.log'
}
]
});

module.exports = log;
