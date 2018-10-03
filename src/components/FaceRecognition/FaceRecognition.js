import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = (props) => {
  let imageUrl = props.imageUrl;
  let boxes = props.boxes;
  let boxDivs = [];
  boxes.forEach((box, i) => {
    boxDivs.push(<div
      key={i.toString()}
      className='bounding-box'
      style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
    </div>);
  });

  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputImage"
          alt=""
          src={imageUrl}
          width="500px"
          height="auto" 
        />
        {boxDivs}
      </div>
    </div>
  );
}

export default FaceRecognition;