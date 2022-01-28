import React from "react";

const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  id,
  setSongs,
  isplaying,
  audioRef,
}) => {
  const songSelecteHandler = async () => {
    const selectedSong = songs.filter((state) => state.id === id);
    await setCurrentSong(selectedSong[0]);
    //add actice song

    const newSong = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSong);
    if (isplaying) audioRef.current.play();
  };

  return (
    <div
      onClick={songSelecteHandler}
      className={`library-song ${song.active ? "selected-song" : ""} `}
    >
      <img src={song.cover} alt={song.name} />

      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
