import { el, mount } from './utils';

const suggestions = el('ul');
document.body.addEventListener('click', e => {
  const search = document.getElementById('search');
  if (!search.contains(e.target)) suggestions.innerHTML = '';
});

const City = (forecast, city) =>
  el(
    'li',
    {
      onclick() {
        forecast.get(city.id);
      },
    },
    `${city.name}, ${city.country}`
  );

const Header = forecast => {
  const cities = forecast.getCities();
  const input = el('input', {
    type: 'text',
    oninput() {
      const { value } = this;
      const data = cities
        .filter(city => city.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 10);
      mount(data.map(city => City(forecast, city)), suggestions);
    },
  });
  forecast.on('get', () => {
    input.value = '';
    suggestions.innerHTML = '';
  });
  return el('header', { id: 'search' }, [
    input,
    el('img', { src: 'https://img.icons8.com/777777/search' }),
    suggestions,
  ]);
};

const Main = forecast => {
  const content = el('div', { id: 'content' });
  forecast.on('get', info => {
    info.then(data =>
      mount(
        [
          el('div', { class: 'current' }, [
            el('div', { class: 'first' }, [
              el('p', { class: 'city' }, data.city),
              el('p', null, data.all[0].date),
              el('p', { class: 'weather' }, data.all[0].description),
              el('p', { class: 'temp' }, `${data.all[0].temp_min}\u00B0`),
            ]),
            el(
              'div',
              { class: 'second' },
              el('img', {
                src: `http://openweathermap.org/img/wn/${data.all[0].icon}@2x.png`,
              })
            ),
            el('div', { class: 'third' }, [
              el('p', null, [el('b', null, 'Wind'), `${data.all[0].wind}m/s`]),
              el('p', null, [el('b', null, 'Humidity'), data.all[0].humidity]),
              el('p', null, [el('b', null, 'Pressure'), data.all[0].pressure]),
            ]),
          ]),
          el('h2', null, 'Forecast'),
          el('div', { class: 'forecast' }, [
            el('div', null, [
              el('img', {
                src: `http://openweathermap.org/img/wn/${data.all[0].icon}.png`,
              }),
              el('p', null, data.all[0].description),
              el('p', { class: 'temp' }, `${data.all[0].temp_min}\u00B0`),
              el('p', null, [
                el('b', null, 'Wind: '),
                `${data.all[0].wind}m/s`,
              ]),
            ]),
            el('div', null, [
              el('img', {
                src: `http://openweathermap.org/img/wn/${data.all[0].icon}.png`,
              }),
              el('p', null, data.all[0].description),
              el('p', { class: 'temp' }, `${data.all[0].temp_min}\u00B0`),
              el('p', null, [
                el('b', null, 'Wind: '),
                `${data.all[0].wind}m/s`,
              ]),
            ]),
            el('div', null, [
              el('img', {
                src: `http://openweathermap.org/img/wn/${data.all[0].icon}.png`,
              }),
              el('p', null, data.all[0].description),
              el('p', { class: 'temp' }, `${data.all[0].temp_min}\u00B0`),
              el('p', null, [
                el('b', null, 'Wind: '),
                `${data.all[0].wind}m/s`,
              ]),
            ]),
            el('div', null, [
              el('img', {
                src: `http://openweathermap.org/img/wn/${data.all[0].icon}.png`,
              }),
              el('p', null, data.all[0].description),
              el('p', { class: 'temp' }, `${data.all[0].temp_min}\u00B0`),
              el('p', null, [
                el('b', null, 'Wind: '),
                `${data.all[0].wind}m/s`,
              ]),
            ]),
            el('div', null, [
              el('img', {
                src: `http://openweathermap.org/img/wn/${data.all[0].icon}.png`,
              }),
              el('p', null, data.all[0].description),
              el('p', { class: 'temp' }, `${data.all[0].temp_min}\u00B0`),
              el('p', null, [
                el('b', null, 'Wind: '),
                `${data.all[0].wind}m/s`,
              ]),
            ]),
          ]),
        ],
        content
      )
    );
  });
  return el('main', { id: 'main' }, [Header(forecast), content]);
};

const Footer = () =>
  el('footer', { id: 'footer' }, [
    'Powered by',
    el(
      'a',
      { href: 'https://github.com/FabienNeibaf/', target: '_blank' },
      'Fabien'
    ),
  ]);

const App = forecast => {
  const app = el('section', { id: 'app' }, [Main(forecast), Footer()]);
  forecast.get(524901);
  return app;
};

export default App;
