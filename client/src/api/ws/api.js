import socket from './index.js';

export const emitTest = ( data, options ) =>
  socket.emit( 'test', data, options );

export const emitMessage = ( room, message ) =>
  socket.emit( 'message', room, message );

export const joinToRoom=(room)=>
  socket.emit('join-to-room',room);