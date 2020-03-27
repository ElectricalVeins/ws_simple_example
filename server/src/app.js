const http = require( 'http' );
const express = require( 'express' );
const socketIO = require( 'socket.io' );

const app = express();
const server = http.Server( app );
const io = socketIO( server );

const router = require( './router' );

app.use( router );

//SOCKET.IO//======================================================
const chat = io.of( '/chat' );
const serverEvent = io.of( '/events' );

chat.on( 'connection', ( socket ) => {

  socket.broadcast.emit( 'new-user', socket.id );

  socket.on( 'send-message', ( to, message ) => {

    message.author = socket.id;

    socket.to( to ).emit( 'get-private-message', message )
  } );

  socket.on( 'get-users', () => {
    chat.clients( ( err, clients ) => {
      if( err ) {
        throw err
      }
      const users = [ ...clients ];
      users.splice( users.indexOf( socket.id ), 1 );

      socket.emit( 'get-users', users )
    } )

  } );

  socket.on( 'disconnect', ( reason ) => {
    chat.emit( 'user-leave', socket.id );
  } )

} );

serverEvent.on( 'connecton', ( socket ) => {

} );

/*const rooms = [ 'room1', 'room2' ];
 const joinToRooms = ( socket ) => {
 rooms.forEach( room => {
 socket.join( room )
 } )
 };
 io.on( 'connection', ( socket ) => {
 joinToRooms( socket );

 socket.on( 'message', ( room, message ) => {
 io.in( room ).emit( 'new-message',room, message )
 } );

 socket.on('join-to-room',(room)=>{
 socket.join(room)
 });

 socket.on( 'disconnect', ( reason ) => {
 } )

 } );*/
//==================================================================

const PORT = process.env.PORT || 3000;
server.listen( PORT,
  () => console.log( `App listening on port ${PORT}!` ) );

module.exports = io;
