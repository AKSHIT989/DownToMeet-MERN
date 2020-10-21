import React from "react";
import img from '../assets/404.jpg'
const NotFound = () => {
  return (
    <div>
      <img
        style={{
          display: "block",
          width: "90%",
          height: "90vh",
          margin: "auto"
        }}
        src={require('../assets/404.jpg')}
        alt="404"
      />
    </div>
  );
};
export default NotFound;
