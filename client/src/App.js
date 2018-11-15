import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import HomeScreen from './components/home-screen';
import UploadScreen from './components/upload-screen';
import ViewFilesScreen from './components/view-files-screen';

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%
`;

const MenuContainer = styled.div`
  display: flex;
  display-direction: column;
  height: 100%;
  background-color: #f1f1f1;
  padding-right: 30px;
  list-style-type: none;
  font-size: 18px;
`;

const OtherContainer = styled.div`

`;

class App extends Component {
  state = {
    
  };
  render() {
    return (
      <AppContainer>
        <Router>
        <div className="App">
          <MenuContainer>
            <ul>
              <li><Link style={{textDecoration: 'none', color: 'gray'}} to="/home">Home</Link></li>
              <li><Link style={{textDecoration: 'none', color: 'gray'}} to="/upload">Upload</Link></li>
              <li><Link style={{textDecoration: 'none', color: 'gray'}} to="/view">View Files</Link></li>
            </ul>
          </MenuContainer>
          <Route path="/home" component={HomeScreen} />
          <Route path="/upload" component={UploadScreen} />
          <Route path="/view" component={ViewFilesScreen} />
          </div>
        </Router>
      </AppContainer>
    );
  }
}

export default App;
