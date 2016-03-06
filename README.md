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

Take a look at [commando-alert](https://gist.github.com/rzane/c533081aa21a0e0fef17) for an example.

Once your plugin is installed, the entry file in your `package.json` will be automatically require. Then, you need to do is require your component in [client/commands.js](client/commands.js).
