import React, { Component } from 'react';
import { firestore } from '../firebase';
import styled from 'styled-components';

const ImageThumbNailsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 40px 0 0 40px;
`;

const ThumbNailContainer = styled.div`
    padding: 0 12px;
`;

const ImageContainer = styled.div`
    
`;

const TopMessage = styled.h1`
    font-weight: lighter;
    font-size: 13px;
    padding-left: 40px;

`;

class ViewFilesScreen extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        itemsInfo: [],
        words: ['word', 'word2', 'word3']
      };
    }

    componentDidMount = () => {
        this.getDocuments();
    }

    getDocuments = () => {
        const db = firestore;
        db.settings({
            timestampsInSnapshots: true
        });

        let itemsList = []
        var itemsRef = db.collection('files')
        itemsRef.get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    itemsList.push(doc.data())
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
            
        this.setState({itemsInfo: itemsList});
    };

    renderImages = () => {
        let images = this.state.itemsInfo.map( item => {
            return (
                <ThumbNailContainer key={item.url}>
                    <ImageContainer>
                        <img src={item.url || 'http://via.placeholder.com/40x30'} alt="thumbnail" height="65" />
                    </ImageContainer>
                    <p>{item.imageName}</p>
                </ThumbNailContainer>
            )
        })
        return (
            images
        )
    };
    
    render() {
        return (
            <div>
                <TopMessage>Select "View Files" from the left hand menu to load images and video files</TopMessage>
                <ImageThumbNailsContainer>
                    {this.renderImages()}
                </ImageThumbNailsContainer>
            </div>
        )
    }
}

export default ViewFilesScreen;

