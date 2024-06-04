import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faRedo,
  faSyncAlt,
  faStop,
} from "@fortawesome/free-solid-svg-icons";
import EmotionPopup from "./Popup";
import { useTimer } from "@/app/page";

export default function Timer() {
  const [showFeedPopup, setShowFeedPopup] = useState(false);
  const { isPlaying, setIsPlaying, setUserInteraced } = useTimer();
  const [duration, setDuration] = useState(0); // Default 0 seconds
  const [initialDuration, setInitialDuration] = useState(0); // To store user's initial time
  const [showPopup, setShowPopup] = useState(false);
  const [editingTime, setEditingTime] = useState(false);
  const [inputHours, setInputHours] = useState(1);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [countDownKey, setCountDownKey] = useState(0);

  const handleMouseEnter = () => {
    setShowPopup(true);
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  const handleScroll = (e) => {
    if (e.deltaY !== 0 && !editingTime) {
      const increment = e.deltaY < 0 ? -5 : 5; // Increment or decrement by 5 minutes (300 seconds)
      setDuration((prevDuration) => Math.max(0, prevDuration + increment));
      setInitialDuration(duration);
    }
  };

  const handleTimerClick = () => {
    if (!isPlaying) {
      if (editingTime) {
        setEditingTime(false);
      } else {
        setEditingTime(true);
      }
      setInputHours(Math.floor(duration / 3600));
      setInputMinutes(Math.floor((duration % 3600) / 60));
    }
  };

  const handleInputBlur = (e) => {
    e.stopPropagation();
    const newDuration = inputHours * 3600 + inputMinutes * 60;
    setDuration(newDuration);
    setInitialDuration(newDuration);
    setEditingTime(false);
  };

  const handleInputClick = (e) => {
    e.stopPropagation();
    if (!isPlaying) {
      setEditingTime(true);
      e.target.select(); // Select the input content on click
    }
  };

  const handleInputChange = (e, type) => {
    const value = Number(e.target.value);
    if (type === "hours") {
      setInputHours(value);
    } else if (type === "minutes") {
      setInputMinutes(Math.min(parseInt(value), 60));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleInputBlur(e);
    }
    if (!editingTime) {
      if (e.key === " ") {
        handlePlayPause(e);
      } else if (e.key.toLowerCase() === "r") {
        handleReset(e);
      } else if (e.key.toLowerCase() === "s") {
        handleStop(e);
      }
    }
  };

  useEffect(() => {
    let timer;
    if (showPopup) {
      timer = setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
    }
    return () => clearTimeout(timer);
  }, [showPopup]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlaying, editingTime]);

  const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const handlePlayPause = (e) => {
    e.stopPropagation();
    setEditingTime(false);
    setUserInteraced(true);
    setIsPlaying((prev) => !prev);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setDuration(0);
    setCountDownKey((prevKey) => prevKey + 1);
    setIsPlaying(false); // Reset to default 0 seconds
  };

  const handleStop = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setShowFeedPopup(true);
    setDuration(0);
    setCountDownKey((prevKey) => prevKey + 1);
    setIsPlaying(false); // Update key to restart timer
  };

  const handleRestart = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      setDuration(initialDuration);
      setCountDownKey((prevKey) => prevKey + 1); // Update key to restart timer
      setIsPlaying(true);
    }
  };

  const handleSaveEmotions = (emotions) => {
    const sessionData = {
      emotions,
      timestamp: new Date(),
    };
    const previousSessions = JSON.parse(localStorage.getItem("emotions")) || [];
    localStorage.setItem(
      "emotions",
      JSON.stringify([...previousSessions, sessionData])
    );
  };

  const handlePopupBlur = ()=>{
    setShowFeedPopup(false);
  };

  return (
    <div className="relative w-64 h-64 mx-auto mb-6">
      <div
        onWheel={handleScroll}
        onClick={handleTimerClick}
        style={{ cursor: "pointer" }}
      >
        <CountdownCircleTimer
          key={countDownKey}
          isPlaying={isPlaying}
          duration={duration}
          colors={["#eee"]}
          onComplete={() => {
            setIsPlaying(false);
            setShowFeedPopup(true);
          }}
          size={256}
          strokeWidth={7}
          trailColor="#747275"
          trailStrokeWidth={7}
        >
          {({ remainingTime }) => (
            <div className="flex flex-col items-center justify-center text-center">
              {!editingTime ? (
                <div>
                  <span className="text-4xl text-white">{formatTime(remainingTime)}</span>
                  {!isPlaying && (
                    <span className="block mt-1 text-sm text-gray-600">
                      Click or scroll
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex items-center w-full">
                  <input
                    type="number"
                    value={inputHours}
                    onClick={handleInputClick}
                    onChange={(e) => handleInputChange(e, "hours")}
                    onBlur={handleInputBlur}
                    onKeyDown={handleKeyDown}
                    className="w-14 flex-grow-0 flex-shrink-0 border border-white rounded-md px-2 py-1 text-center text-xl bg-transparent focus:border-blue-500 outline-none appearance-none no-spinner"
                  />
                  <span className="text-xl mx-1">h</span>
                  <span className="text-xl mx-1">:</span>
                  <input
                    type="number"
                    value={inputMinutes}
                    onClick={handleInputClick}
                    onChange={(e) => handleInputChange(e, "minutes")}
                    onBlur={handleInputBlur}
                    onKeyDown={handleKeyDown}
                    className="w-14 flex-grow-0 flex-shrink-0 border border-white rounded-md px-2 py-1 text-center text-xl bg-transparent focus:border-blue-500 outline-none appearance-none no-spinner"
                  />
                  <span className="text-xl mx-1">m</span>
                </div>
              )}
            </div>
          )}
        </CountdownCircleTimer>
      </div>
      <div className="flex justify-center mt-4 space-x-8">
        {!isPlaying ? (
          <button
            onClick={handleReset}
            className="text-white hover:text-gray-200"
          >
            <FontAwesomeIcon icon={faRedo} size="2x" />
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="text-white hover:text-gray-200"
          >
            <FontAwesomeIcon icon={faStop} size="2x" />
          </button>
        )}
        <button
          onClick={handleRestart}
          className={`text-white hover:text-gray-200 ${
            !isPlaying ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isPlaying}
        >
          <FontAwesomeIcon icon={faSyncAlt} size="2x" />
        </button>
        <button
          onClick={handlePlayPause}
          className={`text-white hover:text-gray-200`}
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size="2x" />
        </button>
      </div>
      <EmotionPopup
        show={showFeedPopup}
        onClose={() => setShowFeedPopup(false)}
        onSave={handleSaveEmotions}
      />
    </div>
  );
}
