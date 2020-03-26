import socket from './index.js';

export const emitTest = ( data, options ) =>
  socket.emit( 'test', data, options );

export const emitMessage = ( room, message ) =>
  socket.emit( 'message', room, message );

socket.on( 'test_answer', ( string, data ) => {
  alert( string );
  console.dir( data );
} );