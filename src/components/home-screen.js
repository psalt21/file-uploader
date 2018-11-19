import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
    font-size: 14px;
    margin-bottom: 8px;
    margin-top: 16px;
    margin: 8px 0 0 40px;
`;

class HomeScreen extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        loading: true,
        pages: []
      };
    }   

    render() {
        return (
            // <Container>{this.props.content}</Container>
            <Container>
                <h1>File Uploader</h1>
                <p>Welcome to File Uploader! A place to upload and view images and videos.</p>
                <p>click <Link to="/upload">HERE</Link> to start uploading now</p>
            </Container>
        )
    }
}

export default HomeScreen;

