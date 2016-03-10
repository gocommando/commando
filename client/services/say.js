import once from 'lodash/fp/once';

const Speaker = window.SpeechSynthesisUtterance;

function findVoiceSync (name) {
  const voices = speechSynthesis.getVoices();
  return voices.find(v => v.name === name) || voices[0];
}

function findVoice (name, callback) {
  const allVoices = speechSynthesis.getVoices();
  const voiceFound = () => callback(findVoiceSync(name));

  if (!allVoices.length) {
    speechSynthesis.onvoiceschanged = once(voiceFound);
  } else {
    voiceFound();
  }
}

export const isSupportedBrowser = (
  Speaker && window.speechSynthesis
);

export default function say (msg) {
  findVoice('Google UK English Male', (voice) => {
    let speaker = new Speaker(msg);
    speaker.voice = voice;
    speechSynthesis.speak(speaker);
  });
}
