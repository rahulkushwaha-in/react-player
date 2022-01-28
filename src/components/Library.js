import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  setCurrentSong,
  setSongs,
  libraryStatus,
  isplaying,
  audioRef,
}) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""} `}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            song={song}
            setCurrentSong={setCurrentSong}
            songs={songs}
            key={song.id}
            id={song.id}
            setSongs={setSongs}
            isplaying={isplaying}
            audioRef={audioRef}
          />
        ))}
      </div>
    </div>
  );
};
export default Library;
