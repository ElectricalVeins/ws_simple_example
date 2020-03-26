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


io.on( 'connection', ( socket ) => {

  socket.on( 'test', ( data, options ) => {
    socket.emit( 'test_answer', 'Test event server emit' )
  } );


  socket.on( 'disconnect', ( reason ) => {} )

} );


//io.on('connection', connectionHandler);


const PORT = process.env.PORT || 3000;
server.listen( PORT,
  () => console.log( `App listening on port ${PORT}!` ) );

module.exports = io;
