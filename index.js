var express = require('express')
var app = express()

const Arena = require('bull-arena');

var arena = Arena({
  queues: [
    {
      // Name of the bull queue, this name must match up exactly with what you've
      // defined in bull
      name: "sendPriceAdjustmentEmail",
      hostId: process.env["NODE_ENV"],
      prefix: process.env["NODE_ENV"],
      redis: {
        url: process.env['REDIS_URL']
      }
    }
  ]
}, {
  baseURL: '/queue',
  disableListen: true
});

app.use('/queue', arena)
app.listen(13131)
