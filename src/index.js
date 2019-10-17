import './index.scss';
import App from './App';
import Forecast from './Forecast';
import { mount } from './utils';

const forecast = new Forecast();

mount(App(forecast), document.getElementById('root'));
