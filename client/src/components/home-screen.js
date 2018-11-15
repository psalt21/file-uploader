import React, { Component } from 'react';
// import styled from 'styled-components';

// const Container = styled.div`
//     font-size: 14px;
//     margin-bottom: 8px;
// margin-top: 16px;
// `;

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
            <div style={{width: "280px", height: "200px", background: "red"}}>home screen goes here</div>
        )
    }
}

export default HomeScreen;

