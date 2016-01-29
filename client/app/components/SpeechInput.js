import React, { Component } from 'react';

function say (message) {
  let su = new SpeechSynthesisUtterance();
  su.lang = "en";
  su.text = message;
  speechSynthesis.speak(su);
}

function sendCommand (message, callback) {
  let url = '/api/commands/recognize/' + encodeURIComponent(message);

  fetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(callback);
}

function handleResult (result, setState) {
  if (result.isFinal) {
    setState({ color: 'green', message: result[0].transcript });

    sendCommand(result[0].transcript, (response) => {
      say(response.reply);
      setState({ reply: response.reply });
    });
  }
}

export default class SpeechInput extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      color: 'black',
      message: 'Click start and say something...',
      reply: undefined
    };
  }

  componentDidMount () {
    this.recognizer = new webkitSpeechRecognition();
    this.recognizer.lang = "en";
    this.recognizer.onresult = (event) => {
      if (event.results.length > 0) {
        let result = event.results[event.results.length-1];
        handleResult(result, this.setState.bind(this));
      }
    };
  }

  start () {
    this.recognizer.start();
    this.setState({ message: 'Listening...' });
  }

  render () {
    return (
      <div>
        <h1>Commando</h1>
        <h4 style={{ color: this.state.color }}>
          { this.state.message }
        </h4>
        <h4 style={{color: 'blue'}}>
          { this.state.reply }
        </h4>
        <button onClick={ this.start.bind(this) }>Start</button>
      </div>
    );
  }
}
