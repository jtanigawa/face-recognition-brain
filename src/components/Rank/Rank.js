import React from 'react';


const Rank = (props) => {
  let name = props.name;
  let entries = props.entries;
  return (
    <div>
      <div className="white f3">
        {`${name}, your current entry count is. . . .`}
      </div>
      <div className="white f1">
        {entries}
      </div>
    </div>
  );
}

export default Rank;