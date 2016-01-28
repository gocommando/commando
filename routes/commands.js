var express = require('express');
var router = express.Router();
var commands = require('../services/commands');

function notFound (res) {
  res.status(404).json({ error: 'Not Found' });
}

function find (req, res, next) {
  req.command = commands.find(req.params.id);
  req.command ? next() : notFound(res);
}

function recognize (req, res, next) {
  req.command = commands.recognize(req.params.q);
  req.command ? next() : notFound(res);
}

router.get('/', function (req, res) {
  res.json(commands.toJSON());
});

router.get('/recognize/:q', recognize, function (req, res) {
  res.status(200).json(req.command.toJSON());
});

router.post('/recognize/:q', recognize, function (req, res) {
  var args = req.command.extract(req.params.q);
  var result = req.command.invoke(args);
  res.status(200).json(result);
});

router.get('/:id', find, function (req, res) {
  res.json(req.command.toJSON());
});

router.post('/:id', find, function (req, res) {
  req.command.invoke(req.params.action);
  res.status(200).end();
});

module.exports = router;
