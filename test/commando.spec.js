import {
  commands,
  register,
  serializeCommands,
  findCommand,
  recognizeCommand
} from 'commando';

import {
  registerDummy,
  resetCommands,
  fixtures
} from './support/fixtures';

describe('commando', function () {
  beforeEach(registerDummy);
  afterEach(resetCommands);

  describe('register', function () {
    it('adds a new command', function () {
      expect(commands.length).to.equal(1);
    });

    it('decorates the object', function () {
      register(fixtures.dummy);
      expect(commands[0].toJSON).to.be.a('function');
    });
  });

  describe('serializeCommands', function () {
    it('returns serialized commands', function () {
      expect(serializeCommands()).to.deep.equal([fixtures.dummyJSON]);
    });
  });

  describe('findCommand', function () {
    it('locates a command by its intent', function () {
      expect(findCommand('blah').name).to.equal('Blah');
    });
  });

  describe('recognizeCommand', function () {
    it('locates a command based on regex', function () {
      expect(recognizeCommand('foo bar').intent).to.equal('blah');
    });
  });
});
