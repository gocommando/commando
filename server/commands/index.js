import { register } from 'commando';
import reminder from './reminder';
import speak from './speak';
import weather from './weather';
import youtube from './youtube';

[reminder, speak, weather, youtube].forEach(cmd => register(cmd));
