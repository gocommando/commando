import error from '../static/sounds/error.mp3';
import speechRecognized from '../static/sounds/speech-recognized.mp3';

function play (file) {
  new Audio(file).play();
}

export function playError () {
  play(error);
}

export function playSpeechRecognized () {
  play(speechRecognized);
}
