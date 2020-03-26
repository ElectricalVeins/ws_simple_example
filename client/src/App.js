import React, { Component } from 'react';
import styles               from './App.module.css';
import { emitMessage }      from "./api/ws/api";
import socket               from './api/ws'

class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      room1: {
        messages: [],
      },
      room2: {
        messages: [],
      },
      message: '',
      currentRoom: 'room1'
    }
  }

  componentDidMount() {
    socket.on( 'new-message', this.handleNewMessage )
  }

  handleNewMessage = ( room, message ) => {
    this.setState( {
      [ room ]: {
        messages: [
          ...this.state[ room ].messages,
          message ]
      }
    } )
  };

  switchRoom = ( e ) => {
    this.setState( {
      currentRoom: e.target.value
    } )
  };

  sendMessage = () => {
    const { currentRoom, message } = this.state;
    emitMessage( currentRoom, message );
    this.setState( { message: '', } )
  };

  render() {
    const {
      message,
      currentRoom,
      room1: { messages: room1Messages },
      room2: { messages: room2Messages }
    } = this.state;

    return (
      <>
        <div className={styles.roomsContainer}>
          <MessageList messages={room1Messages}/>
          <MessageList messages={room2Messages}/>
        </div>

        <label>
          <input type="radio"
                 name={'currentRoom'}
                 value={'room1'}
                 checked={currentRoom === 'room1'}
                 onChange={this.switchRoom}/>
          <span>Room1</span>
        </label>

        <br/>

        <label>
          <input type="radio"
                 name={'currentRoom'}
                 value={'room2'}
                 checked={currentRoom === 'room2'}
                 onChange={this.switchRoom}/>
          <span>Room2</span>
        </label>

        <br/>

        <input type="text"
               value={message}
               onChange={( e ) => {
                 this.setState( { message: e.target.value } )
               }}/>
        <button type='submit'
                onClick={this.sendMessage}>
          Send message >
        </button>

      </>
    );
  }
}

export default App;

function MessageList( props ) {
  const { messages } = props;

  return ( <ul className={styles.messageList}>
    {
      messages.map( ( msg, index ) => <li key={index}>{msg}</li> )
    }
  </ul> );
}