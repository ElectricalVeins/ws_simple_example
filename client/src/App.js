import React from 'react';
import logo  from './logo.svg';
import './App.css';

const socket = new WebSocket( 'ws://localhost:3000/' );

socket.onopen = ( event ) => {
  alert( 'connection opened' );
  console.dir( event )
};

socket.onclose = ( event ) => {
  alert( 'connection closed' );
  console.dir( event )
};

socket.onmessage=(event)=>{
  console.dir(event)
}

class App extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      messages: [],
      messageValue: '',
    }
  }

  sendMessage = () => {
    socket.send( this.state.messageValue );
  };

  handleChange = ( e ) => {
    this.setState( {
      messageValue: e.target.value,
    } )
  };

  render() {
    return (
      <>
        <input type="textarea"
               value={this.state.messageValue}
               onChange={this.handleChange}
        />
        <button onClick={this.sendMessage}>SEND MESSAGE</button>
      </>
    );
  }
}

export default App;
