import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from '../components/Navigation/Navigation.js';
import Signin from '../components/Signin/Signin.js';
import Register from '../components/Register/Register.js';
import Logo from '../components/Logo/Logo.js';
import Rank from '../components/Rank/Rank.js';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition.js';
import './App.css';
import Particles from 'react-particles-js';
import {
  setRoute,
  setUser,
  setUrlField,
  clarifaiDetectFace,
} from '../actions';


const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

const mapStateToProps = state => ({
  route: state.setRoute.route,
  isSignedIn: state.setRoute.isSignedIn,
  user: state.setUser.user,
  imageUrl: state.setUrl.imageUrl,
  isPending: state.requestFaceDetect.isPending,
  error: state.requestFaceDetect.error,
  faceBoxes: state.requestFaceDetect.boxes,
});

const mapDispatchToProps = dispatch => ({
  onRouteChange: route => dispatch(setRoute(route)),
  loadUser: user => dispatch(setUser(user)),
  onUrlChange: event => dispatch(setUrlField(event.target.value)),
  onPictureSubmit: imageUrl => dispatch(clarifaiDetectFace(imageUrl)),
});


class App extends Component {

  render() {
    let {
      route,
      isSignedIn,
      user,
      imageUrl,
      faceBoxes,
      
      onRouteChange,
      loadUser,
      onUrlChange,
      onPictureSubmit,
    } = this.props;
    let body;
    
    if (route === 'home') {
      body = (
        <div>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={onUrlChange}
            pictureSubmit={onPictureSubmit}
          />
          <FaceRecognition imageUrl={imageUrl} boxes={faceBoxes} />
        </div>
      );
    }else if (route === 'signout' || route === 'signin') {
      body = (
        <Signin onRouteChange={onRouteChange} loadUser={loadUser} />
      );
    }else {
      body = (
        <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      );
    }
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
        { body }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
