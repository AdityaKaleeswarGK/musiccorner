import React from "react";

function Song(props) {
  return (
    <div className="song">
      <h1>{props.Songtitle}</h1>
      <p>{props.album}</p>
      <p>{props.artist}</p>
    </div>
  );
}

export default Song;
