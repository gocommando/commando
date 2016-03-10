import EventEmitter from 'events';

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

export default class Speech extends EventEmitter {
  constructor () {
    super();

    if (!SpeechRecognition) {
      this.isNotSupported = true;
      return;
    }

    this.recognizer = new SpeechRecognition();
    this.startedAt = null;

    // configuration
    this.recognizer.maxAlternatives = 5;
    this.recognizer.lang = 'en-US';
    this.recognizer.interimResults = true;
    this.recognizer.continuous = window.location.protocol === 'http:';

    // events
    this.recognizer.onresult = ::this._onResult;
    this.recognizer.onstart = ::this._onStart;
    this.recognizer.onend = ::this._onEnd;
    this.recognizer.onerror = ::this._onError;
  }

  start () {
    if (this.isNotSupported) {
      this.emit('error', new Error('Speech recognition is not supported in your browser'));
    } else {
      this.recognizer.start();
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
      default:
        this.emit('error', new Error('Microphone error'));
    }
  }
}
