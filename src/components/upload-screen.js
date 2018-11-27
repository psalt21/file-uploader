import React, { Component } from 'react';

import Uploader from './uploader';

class UploadScreen extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
      };
    }   

    render() {
        return (
            // <Container>{this.props.content}</Container>
            <Uploader />
        )
    }
}

export default UploadScreen;

