import { el, mount } from './utils';
import cities from './city.list.json';

const getWeather = async id => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=f61acd58d6e808934570a8fec6f4c8a7`,
    { mode: 'cors' }
  );
  return response.json();
};

const City = city =>
  el(
    'li',
    {
      onclick() {
        // getWeather(city.id).then(data => console.log(data));
      },
    },
    [city.name, city.country]
  );

const Main = (forecast) => {
  
}

const Header = () => {
  const suggestions = el('ul');
  return el(
    'header',
    { id: 'header' },
    el('div', null, [
      el('input', {
        type: 'text',
        oninput() {
          const { value } = this;
          const data = cities
            .filter(city =>
              city.name.toLowerCase().includes(value.toLowerCase())
            )
            .slice(0, 10);
          mount(data.map(city => City(city), suggestions));
        },
      }),
      suggestions,
    ])
  );
};

const App = () => {
  return el('section', { id: 'app' }, [Header()]);
};

export default App;
