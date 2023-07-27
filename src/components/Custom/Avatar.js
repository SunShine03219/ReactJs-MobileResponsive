import React from 'react';

const Avatar = ({ name, width, height, background, color, fontSize }) => {
  return (
    <div className="custom-avatar" style={{width: width, height: height, backgroundColor: background, color: color, fontSize: fontSize}}>
      {name?.charAt(0)}
    </div>
  );
};

export default Avatar;