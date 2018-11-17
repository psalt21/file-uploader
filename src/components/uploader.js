import React, { Component } from 'react';
import { storage, firestore } from '../firebase';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 40px 0 0 40px;
    width: auto;
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
            url: '',
            progress: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleChange = event => {
        if (event.target.files[0]) {
            const image = event.target.files[0];
            this.setState(() => ({image}));
        }
    }

    handleUpload = () => {
        const db = firestore;
        db.settings({
            timestampsInSnapshots: true
        });
        
        const {image} = this.state;
        const  uploadTask = storage.ref(`files/${image.name}`).put(image);
        uploadTask.on('state_changed', 
        (snapshot) => {
            // progress function ....
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            this.setState({progress});
        }, 
        (error) => {
            // error function
            console.log(error);
        }, 
        () => {
            //complete function
            storage.ref('files').child(image.name).getDownloadURL().then(url => {
                console.log(url);
                this.setState({url});
                db.collection("files").add({
                    imageName: this.state.image.name,
                    url: url
                });
            })
        });
        
    };

    render() {
        return (
            <Container>
                <img src={this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploaded Files" width="400" />
                <ProgressBar value={this.state.progress} max="100" />
                <ButtonsContainer>
                    <input type="file" onChange={this.handleChange} />
                    <button onClick={this.handleUpload}>Upload</button>
                </ButtonsContainer>
            </Container>
        )
    }
}

export default Uploader;