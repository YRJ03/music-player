import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef();

  const tracks = [
    {
      title: "Song 1",
      src: "/audio/BGM.mp3",
    },
    {
      title: "Song 2",
      src: "/audio/BGM2.mp3",
    },
    {
      title: "Song 3",
      src: "/audio/BGM3.mp3",
    },
  ];

  useEffect(() => {
    audioRef.current = new Audio(tracks[currentTrackIndex].src);
    audioRef.current.addEventListener('timeupdate', updateProgress);
    audioRef.current.addEventListener('loadedmetadata', () => {
      setDuration(audioRef.current.duration);
    });

    return () => {
      audioRef.current.pause();
      audioRef.current.removeEventListener('timeupdate', updateProgress);
    };
  }, [currentTrackIndex]);

  const updateProgress = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const playPauseHandler = () => {
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrackHandler = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === tracks.length - 1 ? 0 : prevIndex + 1
    );
    setIsPlaying(false); // reset play state
  };

  const prevTrackHandler = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? tracks.length - 1 : prevIndex - 1
    );
    setIsPlaying(false); // reset play state
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 text-white rounded-lg w-80 mx-auto shadow-lg">
      <div className="mb-4 text-xl font-bold">Yuvi Music Player</div>
      <div className="mb-2 text-lg">{tracks[currentTrackIndex].title}</div>
      <div className="w-full mb-4">
        <div className="flex items-center justify-between mb-1 text-sm">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <input
          type="range"
          value={currentTime}
          max={duration}
          onChange={(e) => (audioRef.current.currentTime = e.target.value)}
          className="w-full h-1 bg-gray-600 rounded-lg appearance-none"
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={prevTrackHandler}
          className="flex items-center justify-center w-10 h-10 text-lg text-gray-900 bg-white rounded-full shadow-md hover:bg-gray-300 focus:outline-none"
        >
          <FaBackward />
        </button>
        <button
          onClick={playPauseHandler}
          className="flex items-center justify-center w-12 h-12 text-lg text-gray-900 bg-white rounded-full shadow-md hover:bg-gray-300 focus:outline-none"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button
          onClick={nextTrackHandler}
          className="flex items-center justify-center w-10 h-10 text-lg text-gray-900 bg-white rounded-full shadow-md hover:bg-gray-300 focus:outline-none"
        >
          <FaForward />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
