import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faFrown } from "@fortawesome/free-solid-svg-icons";

export default function EmotionPopup({ show, onClose, onSave }) {
  const [emotions, setEmotions] = useState([50, 50, 50, 50, 50, 50]);
  const emotionsLables = [
    { emoji1: "😊", emoji1Name: "Happy" },
    { emoji1: "💪", emoji1Name: "Energized" },
    { emoji1: "😌", emoji1Name: "Relaxed" },
    { emoji1: "🧠", emoji1Name: "Smart" },
    { emoji1: "❤️", emoji1Name: "Love" },
    { emoji1: "🤞", emoji1Name: "Hope" },
    
  ];
  
  const [note, setNote] = useState("");
  const popupRef = useRef(null);

  const handleSliderChange = (index, value) => {
    const newEmotions = [...emotions];
    newEmotions[index] = value;
    setEmotions(newEmotions);
  };

  const handleSave = () => {
    const sessionData = {
      emotions,
      note,
      timestamp: new Date(),
    };

    let sessions = JSON.parse(localStorage.getItem("sessions")) || [];
    sessions.push(sessionData);
    localStorage.setItem("sessions", JSON.stringify(sessions));

    onSave(sessionData);
    onClose();
  };

  useEffect(() => {
    if (show) {
      setEmotions([50, 50, 50, 50, 50, 50]);
      setNote("");
    }
  }, [show]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, onClose]);

  useEffect(() => {
    const handleWheel = (event) => {
      if (event.target.tagName === "INPUT" && event.target.type === "range") {
        const index = parseInt(event.target.dataset.index, 10);
        let newValue = emotions[index] + (event.deltaY < 0 ? 1 : -1);
        newValue = Math.min(100, Math.max(0, newValue));
        handleSliderChange(index, newValue);
      }
    };

    document.addEventListener("wheel", handleWheel);

    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, [emotions]);

  const getSliderColor = (value) => {
    if (value < 50) return `bg-red-${Math.floor(value * 5)}`;
    return `bg-green-${Math.floor((value - 50) * 5)}`;
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div ref={popupRef} className="bg-white p-4 md:p-8 rounded-lg shadow-lg md:w-150">

        <h2 className="text-lg md:text-xl mb-4 text-gray-700">
          How do you feel?
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
          {emotions.map((value, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-gray-800">
                {emotionsLables[index].emoji1Name}
              </span>
              <span
                role="img"
                aria-label={emotionsLables[index].emoji1Name}
                className="text-2xl mb-1 md:mb-2"
              >
                {emotionsLables[index].emoji1}
              </span>
              <input
                type="range"
                min="0"
                max="100"
                value={value}
                data-index={index}
                onChange={(e) => handleSliderChange(index, e.target.value)}
                className={`w-16 md:w-32 ${getSliderColor(value)}`}
              />
            </div>
          ))}
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write your journal note here..."
          className="mt-4 w-full h-16 md:h-24 p-2 border border-gray-200 rounded-lg text-gray-800"
        ></textarea>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
