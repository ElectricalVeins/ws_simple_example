const express = require( 'express' );

const app = express();
const expressWs = require( 'express-ws' )( app );
const aWss = expressWs.getWss( '/' );

app.use( express.json() );

app.ws( '/', ( ws, req ) => {
  ws.on( 'message', ( msg ) => {
    console.log( msg );
    aWss.clients.forEach( ( client ) => {
      client.send( msg );
    } )
  } );
  console.log( req.testing )
} );

const PORT = process.env.PORT || 3000;

app.listen( PORT, () => console.log( `App listening on port ${PORT}!` ) );