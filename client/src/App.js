import React, { Component } from 'react';
import './App.css';
import { emitTest }         from "./api/ws/api";

class App extends Component {


  render() {
    return (
      <>

        <button type='submit'
                onClick={() => {
                  emitTest( 'test', { test: 'test' } )
                }}>
          Send message >
        </button>

      </>
    );
  }
}

export default App;
