const http = require( 'http' );
const express = require( 'express' );
const socketIO = require( 'socket.io' );

const app = express();
const server = http.Server( app );
const io = socketIO( server );

const connectionHandler = require( './ws' );
const router = require( './router' );

app.use( router );
//ws

const rooms = [ 'room1', 'room2' ];
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

} );


//io.on('connection', connectionHandler);


const PORT = process.env.PORT || 3000;
server.listen( PORT,
  () => console.log( `App listening on port ${PORT}!` ) );

module.exports = io;
