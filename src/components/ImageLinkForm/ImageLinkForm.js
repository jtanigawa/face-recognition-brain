import React, { Component } from 'react';
import './ImageLinkForm.css'

class ImageLinkForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: ''
    }
  }

  onUrlChange = event => {
    this.props.onInputChange(event);
    this.setState({url: event.target.value});
  }

  onButtonSubmit = () => {
    this.props.pictureSubmit(this.state.url);
  }

  render() {
    return (
      <div>
        <p className="f3">
          {'This Magic Brain will detect faces in your pictures. Give it a try.'}
        </p>
        <div className="center">
          <div className="form center pa4 br3 shadow-5">
            <input
              className="f4 pa2 w-70 center"
              type="tex"
              id="urlField"
              onChange={this.onUrlChange}
            />
            <button 
              className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
              onClick={this.onButtonSubmit}
            >
            Detect
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageLinkForm;