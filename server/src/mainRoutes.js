let messagesRouters = require('./messages/messagesRoutes');

let router = require('express').Router();

messagesRouters.initalizeRoutes(router);

module.exports = router;