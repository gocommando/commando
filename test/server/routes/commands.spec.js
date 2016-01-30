import {
  start,
  stop,
  get,
  post
} from '../../support/server';

import {
  fixtures,
  registerDummy,
  resetCommands
} from '../../support/fixtures';

describe('(Server) /commands', function () {
  before(start);
  after(stop);
  beforeEach(registerDummy);
  afterEach(resetCommands);

  describe('GET /', function () {
    it('lists all commands', function (done) {
      get('/commands').then(({data}) => {
        expect(data).to.deep.equal([fixtures.dummyJSON]);
        done();
      }).catch(done);
    });
  });

  describe('GET /:intent', function () {
    it('finds a command', function (done) {
      get('/commands/blah').then(({data}) => {
        expect(data).to.deep.equal(fixtures.dummyJSON);
        done();
      }).catch(done);
    });

    it('gives a 404 when command isnt found', function (done) {
      get('/commands/none').catch(({status}) => {
        expect(status).to.equal(404);
        done();
      });
    });
  });

  describe('POST /:intent', function () {
    it('invokes a command', function (done) {
      let params = {action: {keyword: 'GOTCHA'}};

      post('/commands/blah', { data: params }).then(({status, data}) => {
        expect(status).to.equal(200);
        expect(data).deep.equal({reply: 'GOTCHA'});
        done();
      }).catch(done);
    });
  });

  describe('GET /recognize/:q', function () {
    it('finds a command', function (done) {
      get('/commands/recognize/foo%20bar').then(({data}) => {
        expect(data).to.deep.equal(fixtures.dummyJSON);
        done();
      }).catch(done);
    });

    it('gives a 404 when command isnt found', function (done) {
      get('/commands/recognize/none').catch(({status}) => {
        expect(status).to.equal(404);
        done();
      });
    });
  });

  describe('POST /recognize/:q', function () {
    it('invokes a command', function (done) {
      post('/commands/recognize/foo%20bar').then(({status, data}) => {
        expect(status).to.equal(200);
        expect(data).to.deep.equal({reply: 'bar'});
        done();
      }).catch(done);
    });

    it('gives a 404 when command is not found', function (done) {
      post('/commands/recognize/none').catch(({status}) => {
        expect(status).to.equal(404);
        done();
      });
    });

    it('gives a 400 when command fails', function (done) {
      post('/commands/recognize/foo%20ERROR').catch(({status, data}) => {
        expect(status).to.equal(400);
        expect(data.error).to.equal('Throw an error!');
        done();
      });
    });
  });
});
