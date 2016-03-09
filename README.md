[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy) [![Build Status](https://travis-ci.org/gocommando/commando.svg?branch=master)](https://travis-ci.org/rzane/commando)

# Commando

Commando is an open-source, voice-driven, personal assistant. Basically, an open-source version of Google Now. Commando was built with extensibility in mind, so that you can create your own commands.

[Check out the demo](https://gocommando.herokuapp.com)

## Installation

+ `git clone git@github.com:rzane/commando`
+ `cd commando`
+ `npm install`
+ `npm run start:dev`

*Optional:* Certain commands require API tokens. To you use those commands, you'll need to:

+ `mv .env.example .env`
+ Edit the `.env` file and add your API tokens.

## Creating your own plugins

Take a look at [commando-repeat](https://gist.github.com/rzane/c533081aa21a0e0fef17) for an example.

A plugin must consist of three things:

1. A `package.json` with a name starting with `commando-`.
2. An entry point that calls `register`. This handles the server-side processing and recognition of your command.
3. A React component that will be rendered when your command is recognized.

Once you `npm install` your plugin, commando will automatically load it.

*Note: If your entry point uses ES6, don't forget to add an postinstall script to your package.json. See the `commando-repeat` package.json for an example.*
