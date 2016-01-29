import { expect } from 'chai';
import { register, commands } from '../lib/commando';
import { fixtures } from './support/fixtures';

global.expect = expect;
global.fixtures = fixtures;

global.registerDummy = () => register(fixtures.dummy);
global.resetCommands = () => commands.length = 0;
