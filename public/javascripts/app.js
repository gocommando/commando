function render (message) {
  $('#message').addClass('final').text(message);
  var term = encodeURIComponent(message);
  $.post('/commands/recognize/' + term).done(function (response) {
    Speech.say(response.reply);
  });
}

function Speech () {
  this.recognizer = new webkitSpeechRecognition();
  this.recognizer.lang = 'en';
  this.recognizer.onresult = Speech.handle;
  this.start = this.recognizer.start.bind(this.recognizer);
}

Speech.say = function (message) {
  var speaker = new SpeechSynthesisUtterance();
  speaker.lang = 'en';
  speaker.text = message;
  speechSynthesis.speak(speaker);
}

Speech.handle = function (event) {
  if (event.results.length > 0) {
    var result = event.results[event.results.length - 1];

    if (result.isFinal) {
      render(result[0].transcript);
    }
  }
}

window.Commando = {
  initialize: function () {
    var speech = new Speech();

    $('#start-speech-recognition').click(function () {
      speech.start();
    });
  }
}
