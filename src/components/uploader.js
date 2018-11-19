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
                this.setState({videoUrl: url});
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
                    <img src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAG1BMVEXd3d3MzMzOzs7b29vU1NTY2NjS0tLW1tbf399oO5GCAAAE/ElEQVR4nO2dWYKDIBBEHRDk/iceURsVt24UFVPvc8YYKGgo1lQVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACScCs8naY30KrgqkEN3WI8zQrdP/wTVS9m97HqJzTsq0orTVPXVin1J6T9iK3rxujxZd+kzZoxXiKpQlu62boV7YuCtULVF6kUaVabjwWl03mUGrDmS3LVGZXqUObpLF5GzlpFNN+oXG6pVQ71PhGKzq5lzXuAzgR0Lmp4cpX+f70T84ZjszvVz+XxKpyZi2RtK5Cu5v78qP+fPDj42FY3O4hG2qmc2biJsR74Xv4yJ9mL1vq2sSDq0gPRNVT8VufwQ87pJhTH9a+/GcqJzVfsWn2jalHFytugmDu+5AaoSclrGu/5ltzoe8qcqlbGWM+Po3FObsdIrVbeb8mMvScTbdOobimUnFAUWsazp+aQ6YtK7g+NIAoba026XOTmUz//PDQs5GShy63ViWpR41iwWFTex1EYeoLUOAp1OO3jL4DfkkymcdLa6PIbLX6TNZ3zskljSHYlfikhthiPzuaomkqsl6R5fCWCDESzqUoci2F2Iymlb4BC4zjni6lncb9IIZ/anz7OGFVHrMzTC1cgNHn4xLQ+jKMeipH+FbH+lKyS8EvmlfSRoTgrCSTWfDFC0rXRG+rk5D5KmPjjPBuyOl8L4jf0jt9AvpEwBGEkf8yqM/PKxY3Fwr0DJZ9T1qFm+a1X88X+mue5JEXzQiSBMRHL9wyzWOSZrsKN1kwA2bNxLHIqFxmtk6l+iiH1HMO0FDaOxUO+IRbHJi7FcnpWudThEm2w8CdT/RCC1K+FbLAeFIv76KLFkqR+tX2LG/r9eP5xsRYN/f4ASBD17+MCsZama0etosWSdE/bNiNq6HdCEWJNX9RF4vY7IFb3TwOxpuyKNe0TdwwExHLV3G3t9Ic/L1bsHfaUKFqs89ZhOVuzx2+LFe0Ktwcv+oRYaQPp2GAdzjCXPdw5Nesgi0DPN2YdOItTsViiQWFP4WIlz5TKphsGyp78S52Dd9FEFnPFQrDw9kJSV3fkEdi9ofDVnYR1w1as+Sore8dD6euGKSvSkbXi79MK9fhEip9E0D+NG0MmMagku5cL3+sg2QW0totGuD2U4jYxsY/Db3eWYh0NbmIk44VXwt8UOxdLJeyTFOxveiWhgxLXLKa1mr6gbJsl2qsxE0u45a9/QdnOoZIcewhiqdTrLMrey+Zh92vj5Q9pRwZC+17uxSFhp+jxo0MlTL1TxpV/dofmpBSji6r7epF6KuymU6A5EZw3dLo5UyuoDhcbhdV9x4+oVIr179UkOjJbxbu+Jyuh3c19DLD8U78ecgRZzx+Fs3rlGgdPiI+8ZpEmdkqOwmo0ixkL3QX7X7B97xiteZPnhkw3WYwt9qxhgHLyp2x/I9tVL+5vaLPjELz0ilVFu/+V7e/6dcM1yWIcXS2iTRPf/ld4i+VZmzH+665H9LdMa7ol+QD/lL8ksWk2r0gsuysk1nK2pt8WvM9/IAg9mpndU9iP3EgdL5xmQD5n/2JM1sqlSh4/L3GVbvJUL2WbLHd6Pk53d/6VOtXmA3ZhC/pVhu3+nyFR5zqMqY5vGf4C/U92DDntbpjuftqj7rAT+r/Q736Mluy6S4dLhGdKAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAg4B88gCS4KbIjZAAAAABJRU5ErkJggg=='} alt="Uploaded Files" width="400" />
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