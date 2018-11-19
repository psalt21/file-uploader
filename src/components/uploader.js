import React, { Component } from 'react';
import { storage, firestore } from '../firebase';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 40px 0 40px 40px;
    width: auto;
`;

const ImageUploadContainer = styled.div`
    display: flex;    
    flex-direction: column;
    margin-right: 35px;
`;

const VideoUploadContainer = styled.div`
    display: flex;    
    flex-direction: column;
`;

const UploadTypeHeader = styled.h2`
    font-weight: lighter;
`;

const ButtonsContainer = styled.div`
    flex-direction: row;
`;

const ProgressBar = styled.progress`
    width: 400px;
    height: 35px;
`;

class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            imageUrl: '',
            videoUrl: '',
            videoThumbnailUrl: 'https://argoswimvideo.com/wp-content/uploads/2017/11/video-placeholder-1280x720-40.jpg',
            imageProgress: 0,
            videoProgress: 0
        }
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.handleVideoChange = this.handleVideoChange.bind(this);
        this.handleVideoChange = this.handleVideoChange.bind(this);
    }

    handleImageChange = event => {
        if (event.target.files[0]) {
            const image = event.target.files[0];
            this.setState(() => ({image}));
        }
    }

    handleVideoChange = event => {
        if (event.target.files[0]) {
            const video = event.target.files[0];
            this.setState(() => ({video}));
        }
    }

    handleImageUpload = () => {
        const db = firestore;
        db.settings({
            timestampsInSnapshots: true
        });
        
        const {image} = this.state;
        const  uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed', 
        (snapshot) => {
            // progress function ....
            const imageProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            this.setState({imageProgress});
        }, 
        (error) => {
            // error function
            console.log(error);
        }, 
        () => {
            //complete function
            storage.ref('images').child(image.name).getDownloadURL().then(url => {
                this.setState({imageUrl: url});
                db.collection("images").add({
                    imageName: this.state.image.name,
                    url: url
                });
            })
        });
        
    };

    handleVideoUpload = () => {
        const db = firestore;
        db.settings({
            timestampsInSnapshots: true
        });
        
        const {video} = this.state;
        const  uploadTask = storage.ref(`videos/${video.name}`).put(video);
        uploadTask.on('state_changed', 
        (snapshot) => {
            // progress function ....
            const videoProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            this.setState({videoProgress});
        }, 
        (error) => {
            // error function
            console.log(error);
        }, 
        () => {
            //complete function
            storage.ref('videos').child(video.name).getDownloadURL().then(url => {
                this.setState({videoUrl: url, videoThumbnailUrl: 'https://alamotitlesa.com/wp-content/uploads/2015/03/Video-Placeholder-Image.jpg'});
                db.collection("videos").add({
                    videoName: this.state.video.name,
                    url: url
                });
            })
        });
        
    };

    render() {
        return (
            <Container>
                <ImageUploadContainer>
                    <UploadTypeHeader>Upload JPG Image:</UploadTypeHeader>
                    <img src={this.state.imageUrl || 'http://via.placeholder.com/400x224'} alt="Uploaded Files" width="400" />
                    <ProgressBar value={this.state.imageProgress} max="100" />
                    <ButtonsContainer>
                        <input type="file" accept=".jpg, .JPG, .jpeg" onChange={this.handleImageChange} />
                        <button onClick={this.handleImageUpload}>Upload</button>
                    </ButtonsContainer>
                </ImageUploadContainer>
                <VideoUploadContainer>
                    <UploadTypeHeader>Upload MP4 Video:</UploadTypeHeader>
                    <img src={this.state.videoThumbnailUrl} alt="Uploaded Files" width="400" />
                    <ProgressBar value={this.state.videoProgress} max="100" />
                    <ButtonsContainer>
                        <input type="file" accept=".mp4" onChange={this.handleVideoChange} />
                        <button onClick={this.handleVideoUpload}>Upload</button>
                    </ButtonsContainer>
                </VideoUploadContainer>
            </Container>
        )
    }
}

export default Uploader;