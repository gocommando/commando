import config from '../config';
import google from 'googleapis';

google.options({ auth: config.tokens.google });

const youtube = google.youtube('v3');

function search (query, callback) {
  youtube.search.list({
    part: 'snippet',
    type: 'video',
    q: query,
    maxResults: 5,
    safeSearch: 'moderate',
    videoEmbeddable: true
  }, callback);
}

module.exports = {
  name: 'YouTube',

  component: 'YouTube',

  pattern: /play (.+) (from|on|with) youtube/i,

  properties: [
    { name: 'query' }
  ],

  invoke (action, callback) {
    if (!config.tokens.google) {
      callback(new Error('This command requires an API token for Google.'));
      return;
    }

    search(action.query, (err, { items }) => {
      if (err) return callback(err);

      callback(null, {
        videos: items
      });
    });
  }
};
