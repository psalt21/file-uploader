import React, { Component } from 'react';
// import styled from 'styled-components';

// const Container = styled.div`
//     font-size: 14px;
//     margin-bottom: 8px;
// margin-top: 16px;
// `;

class ViewFilesScreen extends Component {
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
            <div>view files here</div>
        )
    }
}

export default ViewFilesScreen;

