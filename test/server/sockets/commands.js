import { start, stop, connectSocket, disconnectSocket } from '../../support/server';
import { registerDummy, resetCommands } from '../../support/fixtures';

describe('(Sockets) command:invoke', function () {
  before(start);
  after(stop);
  beforeEach(registerDummy);
  afterEach(resetCommands);
  beforeEach(connectSocket);
  afterEach(disconnectSocket);

  it('emits command:success when command is successful', function (done) {
    this.socket.on('command:success', ({ data }) => {
      expect(data.props).to.deep.equal({ reply: 'bar' });
      done();
    });

    this.socket.emit('command:invoke', {
      message: 'foo bar'
    });
  });

  it('emits command:error when command is not found', function (done) {
    this.socket.on('command:error', ({ data }) => {
      expect(data.error).to.equal("I didn't recognize that.");
      done();
    });

    this.socket.emit('command:invoke', {
      message: 'meatloaf'
    });
  });

  it('emits command:error when the command fails', function (done) {
    this.socket.on('command:error', ({ data }) => {
      expect(data.error).to.equal('Throw an error!');
      done();
    });

    this.socket.emit('command:invoke', {
      message: 'foo ERROR'
    });
  });
});
