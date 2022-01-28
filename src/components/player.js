import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react/cjs/react.development";

const Player = ({
  currentSong,
  isplaying,
  setIsplaying,
  setCurrentSong,
  songs,
  setSongs,
  audioRef,
  // song,
}) => {
  //use to select html tag in react

  //play song function
  function playSongHandler() {
    if (isplaying) {
      audioRef.current.pause();
      setIsplaying(!isplaying);
    } else {
      audioRef.current.play();
      setIsplaying(!isplaying);
    }
  }

  //useEffect update List
  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
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

    setSongs(newSongs);
  };
  //function to skip back and skip forward
  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    //Forward the SOng
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        return;
      }

      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isplaying) audioRef.current.play();
  };

  //use state  to update the song current time and duration dynamically
  const [songTimeInfo, setSongtimeinfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  //update song time function
  function songTimeUpdateHandler(e) {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //calculate percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    // console.log(animation);
    setSongtimeinfo({
      ...songTimeInfo,
      currentTime: current,
      duration,
      animationPercentage: animation,
    });
  }

  //function for formatting the time in seconds and minutes

  function getTime(time) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }

  //function to make the song slider working
  function dragHandler(e) {
    audioRef.current.currentTime = e.target.value;
    setSongtimeinfo({ ...songTimeInfo, currentTime: e.target.value });
  }
  //trackAnimation
  const trackAnim = {
    transform: `translateX(${songTimeInfo.animationPercentage}%)`,
  };

  //function  to automatically skip to next song when ended
  const skipEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    //Forward the SOng
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    if (isplaying) audioRef.current.play();
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songTimeInfo.currentTime)}</p>
        <div
          style={{
            background: ` linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]}) `,
          }}
          className="track"
        >
          <input
            min={0}
            max={songTimeInfo.duration || 0}
            value={songTimeInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songTimeInfo.duration ? getTime(songTimeInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
          onClick={() => skipTrackHandler("skip-back")}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="3x"
          icon={isplaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-right"
          size="2x"
          icon={faAngleRight}
          onClick={() => skipTrackHandler("skip-forward")}
        />
      </div>
      <audio
        onTimeUpdate={songTimeUpdateHandler}
        onLoadedMetadata={songTimeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={skipEndHandler}
      ></audio>
    </div>
  );
};

export default Player;
