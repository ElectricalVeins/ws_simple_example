const {messageHandler} = require('./eventHandlers');

module.exports = function connectionHandler(socket) {
  socket.on('message', messageHandler);
};