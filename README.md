# file-uploader
React app for uploading and persisting JPG and MP4 files and the ability to view them anytime the app is running.

## Getting Started

download or clone this github repo and make sure you have Node installed (can be found at https://nodejs.org/en/download/) ideally running version 8.12.0 as that is what was run at the time of this being developed.

### Prerequisites

Node (Ideally v8.12.0)

### Installing

To get the app up and running:
```
cd file-uploader
```
```
npm install
```
```
npm start
```

### Using App

Use navigation on left hand side of screen
Upload either JPG or MP4 files from "Upload page"
View files from the "View Files" page. If files don't load the first time select "View Files" again and they will load up.

### Additional Info About the App

React App using Firebase Storage and Firebase Firestore for storing and retrieving files and their info. react-router-dom used for navigation. react-modal-image used for previewing images and react-player used for previewing videos. Style largly managed by the styled-components module.
