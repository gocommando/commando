import { register } from 'commando';
import reminder from './server/reminder';
import speak from './server/speak';
import weather from './server/weather';
import youtube from './server/youtube';

[reminder, speak, weather, youtube].forEach(plugin => {
  register(plugin);
});
