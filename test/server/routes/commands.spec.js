import { get } from 'axios';
import { start, stop, api } from '../../support/server';

describe('(Server) /commands', function () {
  before(start);
  after(stop);
  beforeEach(registerDummy);
  afterEach(resetCommands);

  describe('GET /', function () {
    it('lists all commands', function (done) {
      get(api('/commands')).then(({data}) => {
        expect(data).to.deep.equal([fixtures.dummyJSON])
        done();
      }).catch(done);
    });
  });
});
