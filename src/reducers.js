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

const initialStateRoute = {
  route: 'signin',
  isSignedIn: false,
};

export const setRoute = (state=initialStateRoute, action={}) => {
  switch(action.type) {
    case SET_ROUTE:
      let signedIn;
      if (action.payload === 'signout') {
        signedIn = {isSignedIn: false};
      }else if (action.payload === 'home') {
        signedIn = {isSignedIn: true};
      }
      return Object.assign({}, state, {route: action.payload}, signedIn);
    default:
      return state;
  }
}

const initialStateUser = {
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  }
};

export const setUser = (state=initialStateUser, action={}) => {
  switch(action.type) {
    case SET_USER:
      return Object.assign({}, state, {user: action.payload});
    default:
      return state;
  }
}

const initialStateUrl = {
  urlField: '',
  imageUrl: '',
}

export const setUrl = (state=initialStateUrl, action={}) => {
  switch(action.type) {
    case CHANGE_URL_FIELD:
      return Object.assign({}, state, {urlField: action.payload});
    case SET_IMAGE_URL:
      return Object.assign({}, state, {imageUrl: state.urlField});
    case RESET_IMAGE_URL:
      return Object.assign({}, state, {imageUrl: ''});
    default:
      return state;
  }
}

const initialStateFaceDetect = {
  isPending: false,
  boxes: [],
  error: ''
}

export const requestFaceDetect = (state=initialStateFaceDetect, action={}) => {
  let newState;
  switch(action.type) {
    case REQUEST_FACE_DETECT_PENDING:
      newState = { isPending: true };
      return Object.assign({}, state, newState);
    case REQUEST_FACE_DETECT_SUCCESS:
      newState = { isPending: false, boxes: action.payload };
      return Object.assign({}, state, newState);
    case REQUEST_FACE_DETECT_FAILED:
      newState = { isPending: false, error: action.payload };
      return Object.assign({}, state, newState);
    case RESET_FACE_BOX:
      newState = { isPending: false, boxes: [] };
      return Object.assign({}, state, newState);
    default:
      return state;
  }
}
