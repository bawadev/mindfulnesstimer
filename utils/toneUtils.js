// utils/toneUtils.js

import * as Tone from "tone";

let rainPlayerRef = null;
let gainNodeRef = null;
let toneStarted = false;

export const initializeTone = async () => {
  await Tone.start();
  toneStarted = true;
};

const updatePlayer = (audioUrl) => {
  console.log("updating sound util");
  if (rainPlayerRef) {
    rainPlayerRef.stop();
    rainPlayerRef.dispose();
  }
  gainNodeRef = new Tone.Gain(0).toDestination(); // Initial volume is 0 for fade-in
  rainPlayerRef = new Tone.Player({
    url: audioUrl,
    loop: true,
    autostart: true,
    volume: -12,
  }).connect(gainNodeRef);
  gainNodeRef.gain.linearRampToValueAtTime(1, Tone.now() + 1); // Fade in over 1 second
};

export const playRainSound = (audioUrl) => {
  console.log("Play sound util");
  updatePlayer(audioUrl);
};

export const stopRainSound = () => {
  console.log("Stop sound util");
  if (rainPlayerRef && gainNodeRef) {
    gainNodeRef.gain.cancelScheduledValues(Tone.now());
    gainNodeRef.gain.linearRampToValueAtTime(0, Tone.now() + 1); // Fade out over 1 second
    setTimeout(() => {
      if (rainPlayerRef) {
        rainPlayerRef.stop();
      }
    }, 1000); // Stop after fade-out duration
  }
};

export const getToneStarted = () => {
  return toneStarted;
};

export const setToneStarted = (value) => {
  toneStarted = value;
};

// Function to get the state of the Tone.js player
export const getPlayerState = () => {
  if (rainPlayerRef) {
    return rainPlayerRef.state;
  } else {
    console.error('Player not initialized.');
    return null;
  }
};
