import EventEmitter from 'events';

const protocol = window.location.protocol;

const SpeechRecognition = (
  window.SpeechRecognition ||
  window.webkitSpeechRecognition ||
  window.mozSpeechRecognition
);

let recognizer;
if (SpeechRecognition) {
  recognizer = new SpeechRecognition();
  recognizer.maxAlternatives = 5;
  recognizer.lang = 'en-US';
  recognizer.interimResults = true;
  recognizer.continuous = protocol === 'http:';
}

function mapTranscripts (speechResult) {
  let transcripts = [];
  for (let i = 0; i < speechResult.length; i++) {
    transcripts.push(speechResult[i].transcript);
  }
  return transcripts;
}

export default class Speech extends EventEmitter {
  constructor () {
    super();
    if (recognizer) {
      recognizer.onresult = ::this._onResult;
      recognizer.onstart = ::this._onStart;
      recognizer.onend = ::this._onEnd;
      recognizer.onerror = ::this._onError;
    } else {
      this.isNotSupported = true;
    }
  }

  start () {
    if (this.isNotSupported) {
      this.emit('error', new Error('Speech recognition is not supported in your browser'));
    } else {
      recognizer.start();
    }
  }

  stop () {
    this.stopped = true;
    recognizer.stop();
  }

  abort () {
    this.stopped = true;
    this.removeAllListeners();
    recognizer.abort();
  }

  _onResult (event) {
    const result = event.results[event.resultIndex];
    const transcripts = mapTranscripts(result);
    const eventName = result.isFinal ? 'complete' : 'interim';
    this.emit(eventName, transcripts);
  }

  _onStart () {
    this.emit('start');
  }

  _onEnd () {
    if (this.stopped) {
      return;
    } else {
      this.start();
    }
  }

  _onError (event) {
    switch (event.error) {
      case 'network':
        this.emit('error', new Error('Network error.'));
        break;
      case 'not-allowed':
      case 'service-not-allowed':
        this.emit('error', new Error('Microphone not allowed.'));
        break;
      case 'audio-capture':
        this.emit('error', new Error('Microphone error'));
    }
  }
}
