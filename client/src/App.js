import React, { Component } from 'react';
import './App.css';
import FileUpload from './components/file-upload';

class App extends Component {
  state = {
    
  };
  render() {
    return (
      <div className="App">
        <FileUpload />
      </div>
    );
  }
}

export default App;
