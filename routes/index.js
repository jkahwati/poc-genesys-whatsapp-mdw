const routes = require('express').Router()
  , genesys = require('../routes/genesys')
  , whatsapp = require('../routes/whatsapp')
  , path = require('path');


routes.get('/health', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});
routes.get('/chat', (req, res) => {
  const chatRoute = path.join(__dirname, '..', 'views', 'index.html');
  res.sendFile(chatRoute);
});
routes.use('/openmessaging/genesys', genesys);
routes.use('/webhook/whatsapp', whatsapp);

module.exports = routes;