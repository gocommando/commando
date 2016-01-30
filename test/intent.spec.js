import { regex } from '../lib/intent';
import { fixtures } from './support/fixtures';

describe('intent', () => {
  describe('regex', () => {
    beforeEach(function () {
      this.command = regex(fixtures.dummy);
    });

    it('decorates a command', function () {
      expect(this.command.toJSON).not.to.be.undefined;
    });

    it('verifies presence of keys', function () {
      expect(regex.bind(null, {})).to.throw(Error, /missing required/);
    });

    it('infers an intent from the name', function () {
      expect(this.command.intent).to.equal('blah');
    });

    it('extracts based on properties and pattern', function () {
      let extracted = this.command.extract('foo bar');
      expect(extracted.keyword).to.equal('bar');
    });
  });
});
