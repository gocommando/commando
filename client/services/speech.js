import EventEmitter from 'events';

const protocol = window.location.protocol;

const SpeechRecognition = (
  window.SpeechRecognition ||
  window.webkitSpeechRecognition ||
  window.mozSpeechRecognition
);

function mapTranscripts (speechResult) {
  let transcripts = [];
  for (let i = 0; i < speechResult.length; i++) {
    transcripts.push(speechResult[i].transcript);
  }
  return transcripts;
}

let recognizer;
function setupRecognizer () {
  if (recognizer) recognizer.abort();
  recognizer = new SpeechRecognition();
  recognizer.maxAlternatives = 5;
  recognizer.lang = 'en-US';
  recognizer.interimResults = true;
  recognizer.continuous = protocol === 'http:';
}

export default class Speech extends EventEmitter {
  constructor () {
    super();
    this.startedAt = null;

    if (SpeechRecognition) {
      setupRecognizer();
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

  _onResult (event) {
    const result = event.results[event.resultIndex];
    const transcripts = mapTranscripts(result);
    const eventName = result.isFinal ? 'complete' : 'interim';
    this.emit(eventName, transcripts);
  }

  _onStart () {
    this.startedAt = new Date().getTime();
    this.emit('start');
  }

  _onEnd () {
    let now = new Date().getTime();
    let recency = now - this.startedAt;

    if (recency < 1000) {
      setTimeout(::this.start, 1000 - recency);
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
