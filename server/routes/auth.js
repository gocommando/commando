import express from 'express';
import Purest from 'purest';
import { omit } from 'lodash';
import grantConfig from '../../config/grant';
import authenticate from '../middleware/authenticate';

const router = express.Router();

function fetchProfile (provider, { access_token }, callback) {
  return new Purest({
    provider,
    defaults: { headers: { 'user-agent': 'commando' } }
  }).query().get('user').auth(access_token).request(callback);
}

function convertProfile (provider, query, callback) {
  fetchProfile(provider, query, (err, res, body) => {
    if (err) {
      callback(err);
    } else {
      callback(null, body);
    };
  });
}

router.get('/providers', (req, res) => {
  let providers = omit(grantConfig, ['server']);
  res.json(Object.keys(providers));
});

router.get('/me', authenticate, (req, res) => {
  res.json(req.session.profile);
});

router.get('/github', (req, res) => {
  convertProfile('github', req.query, (err, profile) => {
    if (err) {
      res.json(err);
    } else {
      req.session.profile = profile;
      req.session.save();
      res.redirect('/dashboard');
    }
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

export default router;
