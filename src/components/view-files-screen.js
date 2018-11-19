import React, { Component } from 'react';
import { firestore } from '../firebase';
import styled from 'styled-components';
import _ from 'lodash';
import ModalImage from 'react-modal-image';

const Container = styled.div`
    margin-bottom: 40px;
`;

const ThumbNailsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 40px 0 0 40px;
`;

const ImageThumbNailContainer = styled.div`
    padding-right: 32px;
    width: 100px;
`;

const VideoThumbNailContainer = styled.div`
    padding-right: 32px;
    width: 150px;
`;

const ImagesContainer = styled.div`
    
`;

const VideosContainer = styled.div`

`;

const UploadTypeHeader = styled.h2`
    font-weight: lighter;
    padding-left: 40px;
    margin-bottom: -15px;
`;

const ImageContainer = styled.div`
    text-align: center;
`;

const VideoContainer = styled.div`
    padding-right: 35px;
    width: 150px;
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
        imagesInfo: [],
        videosInfo: []
      };
    }

    componentDidMount = () => {
        this.getImages();
        this.getVideos();
    }

    getImages = () => {
        const db = firestore;
        db.settings({
            timestampsInSnapshots: true
        });

        let itemsList = []
        var itemsRef = db.collection('images')
        itemsRef.get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    itemsList.push(doc.data())
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
            
        this.setState({imagesInfo: itemsList});
    };

    getVideos = () => {
        const db = firestore;
        db.settings({
            timestampsInSnapshots: true
        });

        let itemsList = []
        var itemsRef = db.collection('videos')
        itemsRef.get()
            .then(snapshot => {
                snapshot.forEach(doc => {

                    itemsList.push(doc.data())
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
            
        this.setState({videosInfo: itemsList});
    }

    renderImageThumbnails = () => {
        const uniqueImages = _.uniq(this.state.imagesInfo);
        let images = uniqueImages.map( item => {
            return (
                <ImageThumbNailContainer key={item.url}>
                    <ImageContainer>
                        <ModalImage
                            small={item.url}
                            large={item.url}
                            alt={item.imageName}
                        />
                    </ImageContainer>
                    <p style={{fontSize: "10px"}}>{item.imageName}</p>
                </ImageThumbNailContainer>
            )
        })
        return (
            images
        )
    };

    renderVideoThumbnails = () => {
        const uniqueVideos = _.uniq(this.state.videosInfo);
        let videos = uniqueVideos.map( item => {
            return (
                <VideoThumbNailContainer key={item.url}>
                    <VideoContainer>
                        <img src={'https://alamotitlesa.com/wp-content/uploads/2015/03/Video-Placeholder-Image.jpg'} alt="thumbnail" height="100" />
                    </VideoContainer>
                    <p style={{fontSize: "10px"}}>{item.videoName}</p>
                </VideoThumbNailContainer>
            )
        })
        return (
            videos
        )
    };
    
    render() {
        return (
            <Container>
                <TopMessage>Select "View Files" from the left hand menu to load images and video files</TopMessage>
                <hr style={{marginLeft: '40px', marginRight: '40px', opacity: '0.2'}} />
                <ImagesContainer>
                    <UploadTypeHeader>JPG Images</UploadTypeHeader>
                    <ThumbNailsContainer>
                        {this.renderImageThumbnails()}
                    </ThumbNailsContainer>
                </ImagesContainer>
                <hr style={{marginLeft: '40px', marginRight: '40px', opacity: '0.2'}} />
                <VideosContainer>
                    <UploadTypeHeader>MP4 Videos</UploadTypeHeader>
                    <ThumbNailsContainer>
                        {this.renderVideoThumbnails()}
                    </ThumbNailsContainer>
                </VideosContainer>
            </Container>
        )
    }
}

export default ViewFilesScreen;

