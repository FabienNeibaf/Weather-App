import './index.scss';
import App from './App';
import Forecast from './Forecast';
import { mount, Observable } from './utils';

const forecast = new Observable(new Forecast());

mount(App(forecast), document.getElementById('root'));
