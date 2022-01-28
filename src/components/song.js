import React from "react";

const Song = ({ currentSong, isplaying }) => {
  return (
    <div className="song-container">
      <img
        className={`${isplaying ? "image-rotate" : ""}`}
        src={currentSong.cover}
        alt="song-pic"
      />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;
