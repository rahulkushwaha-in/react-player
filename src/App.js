import React, { useState, useRef } from "react";
import Player from "./components/player";
import Song from "./components/song";
//importing styled
import "./styles/app.scss";
//import utli (song data)
import data from "./util";
//import hole list of song
import Library from "./components/Library";
import Nav from "./components/Nav";
// import LibrarySong from "./components/LibrarySong";
function App() {
  //using state from react
  const [songs, setSongs] = useState(data()); //use this state to fetch song data and put in songs state
  const [currentSong, setCurrentSong] = useState(songs[0]); //use this state to pick one song from the songs state of array
  const [isplaying, setIsplaying] = useState(false); //use this state to play and pause the song

  const [libraryStatus, setlibraryStatus] = useState(false);

  const audioRef = useRef(null);

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setlibraryStatus={setlibraryStatus} />
      <Song currentSong={currentSong} isplaying={isplaying} />
      <Player
        isplaying={isplaying}
        setIsplaying={setIsplaying}
        currentSong={currentSong}
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
      />
      <Library
        libraryStatus={libraryStatus}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
        isplaying={isplaying}
        audioRef={audioRef}
      />
    </div>
  );
}

export default App;
