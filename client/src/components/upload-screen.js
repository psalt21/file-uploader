import React, { Component } from 'react';

import FileUPload from './file-upload';
// import styled from 'styled-components';

// const Container = styled.div`
//     font-size: 14px;
//     margin-bottom: 8px;
// margin-top: 16px;
// `;

class UploadScreen extends Component {
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
            <FileUPload />
        )
    }
}

export default UploadScreen;

