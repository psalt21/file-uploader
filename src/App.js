import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
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
  padding-right: 40px;
  padding-bottom: 40px;
  margin-left: -10px;
  list-style-type: none;
  font-size: 18px;
  width: 180px;
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
                <li><Link style={{textDecoration: 'none', color: 'gray'}} to="/">Home</Link></li>
                <li><Link style={{textDecoration: 'none', color: 'gray'}} to="/upload">Upload</Link></li>
                <li><Link style={{textDecoration: 'none', color: 'gray'}} to="/view">View Files</Link></li>
              </ul>
            </MenuContainer>
            <Route path="/" component={HomeScreen} exact={true} />
            <Route path="/upload" component={UploadScreen} />
            <Route path="/view" component={ViewFilesScreen} />
          </div>
        </Router>
      </AppContainer>
    );
  }
}

export default App;
