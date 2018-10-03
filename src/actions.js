import {
  SET_ROUTE,
  SET_USER,
  CHANGE_URL_FIELD,
  SET_IMAGE_URL,
  RESET_IMAGE_URL,
  REQUEST_FACE_DETECT_PENDING,
  REQUEST_FACE_DETECT_SUCCESS,
  REQUEST_FACE_DETECT_FAILED,
  RESET_FACE_BOX,
} from './constants.js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'e201529b0a6d41569ffeaa470a878541'
});

const calculateFaceLocation = data => {
  let detectedFaces = data.outputs[0].data.regions;
  let boxes = [];
  let image = document.getElementById('inputImage');
  let width = Number(image.width);
  let height = Number(image.height);
  detectedFaces.forEach(region => {
    let faceBox = region.region_info.bounding_box;
    boxes.push({
      leftCol: faceBox.left_col * width,
      topRow: faceBox.top_row * height,
      rightCol: width - (faceBox.right_col * width),
      bottomRow: height - (faceBox.bottom_row * height),
    });
  });
  return boxes;
}

export const setRoute = route => dispatch => {
  if (route === 'signout') {
    dispatch({ type: RESET_FACE_BOX });
    dispatch({ type: RESET_IMAGE_URL });
  }
  dispatch({ type: SET_ROUTE, payload: route });
}

export const setUser = user => ({
  type: SET_USER,
  payload: user,
})

export const setUrlField = text => ({
  type: CHANGE_URL_FIELD,
  payload: text,
})

export const clarifaiDetectFace = imageUrl => (dispatch, getState) => {
  let user = getState().setUser.user;
  dispatch({ type: RESET_FACE_BOX });
  dispatch({ type: SET_IMAGE_URL });
  dispatch({ type: REQUEST_FACE_DETECT_PENDING });
  app.models.predict(Clarifai.FACE_DETECT_MODEL, imageUrl)
  .then(data => {
    if (data) {
      fetch('http://penguin.linux.test:3001/image', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: user.id}),
      })
      .then(res => res.json())
      .then(count => {
        user.entries = count;
        dispatch({ type: SET_USER, payload: user });
        dispatch({ 
          type: REQUEST_FACE_DETECT_SUCCESS,
          payload: calculateFaceLocation(data)
        });
      })
      .catch(err => console.log(err));
    }
  })
  .catch(error => dispatch({ REQUEST_FACE_DETECT_FAILED, payload: error }));
}