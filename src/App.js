import { el, mount } from './utils';

const format = date => {
  const day = date.getDate();
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ][date.getMonth()];
  const time = `${hours}:${minutes}`;
  return { full: `${week}, ${month} ${day}`, day, time };
};

const suggestions = el('ul');
document.body.addEventListener('click', e => {
  const header = document.getElementById('header');
  header.querySelector('input').value = '';
  if (!header.contains(e.target)) suggestions.innerHTML = '';
});

const Fore = (forecast, data) => {
  const { tempUnit } = forecast;
  const temp = el('p', { class: 'temp' }, `${data.temp[tempUnit]}\u00B0`);
  forecast.on('showIn', unit => mount(el(`${data.temp[unit]}\u00B0`), temp));
  return el('div', { class: 'fore' }, [
    el('p', { class: 'date' }, [
      format(data.date).time,
      el(
        'span',
        null,
        new Date().getDate() !== data.date.getDate() ? 'Tomorrow' : ''
      ),
    ]),
    el('img', {
      src: `http://openweathermap.org/img/wn/${data.icon}.png`,
    }),
    el('p', { class: 'weather' }, data.weather),
    temp,
    el('p', { class: 'wind' }, [el('b', null, 'Wind: '), `${data.wind} m/s`]),
  ]);
};

const Time = forecast => {
  const time = el('p', { class: 'time' }, format(new Date()).time);
  const interval = setInterval(
    () => mount(el(format(new Date()).time), time),
    5000
  );
  forecast.on('get', () => clearInterval(interval));
  return time;
};

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

const Switch = forecast => {
  const celsius = el(
    'button',
    {
      class: 'active',
      onclick() {
        forecast.showIn('celsius');
      },
    },
    `\u00B0C`
  );
  const fahrenheit = el(
    'button',
    {
      onclick() {
        forecast.showIn('fahrenheit');
      },
    },
    `\u00B0F`
  );
  forecast.on('showIn', unit => {
    celsius.classList.toggle('active', unit === 'celsius');
    fahrenheit.classList.toggle('active', unit === 'fahrenheit');
  });
  return el('div', { id: 'switch' }, [celsius, fahrenheit]);
};

const Header = forecast => {
  const cities = forecast.getCities();
  const input = el('input', {
    type: 'text',
    oninput() {
      const { value } = this;
      const data = cities
        .filter(city =>
          `${city.name}, ${city.country}`
            .toLowerCase()
            .includes(value.toLowerCase())
        )
        .slice(0, 10);
      mount(data.map(city => City(forecast, city)), suggestions);
    },
  });
  forecast.on('get', () => {
    input.value = '';
    suggestions.innerHTML = '';
  });
  return el('header', { id: 'header' }, [
    Switch(forecast),
    input,
    el('img', { src: 'https://img.icons8.com/777777/search' }),
    suggestions,
  ]);
};

const Main = forecast => {
  const { tempUnit } = forecast;
  const content = el('div', { id: 'content' });
  forecast.on('showIn', unit => {
    const info = forecast.getInfo();
    if (info.fore) {
      const temp = content.querySelector('.current .temp');
      mount(el(`${info.fore[0].temp[unit]}\u00B0`), temp);
    }
  });
  forecast.on('get', info => {
    info.then(data => {
      if (Object.getPrototypeOf(data).name === 'Error') {
        mount(el('div', { class: 'error' }, data.message), content);
      } else {
        mount(
          [
            el('div', { class: 'current' }, [
              el('div', { class: 'one' }, [
                el(
                  'p',
                  { class: 'city' },
                  `${data.city.name}, ${data.city.country}`
                ),
                el('p', { class: 'date' }, format(new Date()).full),
                Time(forecast),
              ]),
              el('div', { class: 'two' }, [
                el('img', {
                  src: `http://openweathermap.org/img/wn/${data.fore[0].icon}@2x.png`,
                }),
                el('p', { class: 'weather' }, data.fore[0].weather),
              ]),
              el(
                'div',
                { class: 'temp' },
                `${data.fore[0].temp[tempUnit]}\u00B0`
              ),
              el('div', { class: 'four' }, [
                el('p', null, [
                  el('b', null, 'Wind'),
                  `${data.fore[0].wind} m/s`,
                ]),
                el('p', null, [
                  el('b', null, 'Humidity'),
                  `${data.fore[0].humidity} \u0025`,
                ]),
                el('p', null, [
                  el('b', null, 'Pressure'),
                  `${data.fore[0].pressure} hPa`,
                ]),
              ]),
            ]),
            el('h2', null, 'Forecast'),
            el('div', { class: 'forecast' }, [
              Fore(forecast, data.fore[1]),
              Fore(forecast, data.fore[2]),
              Fore(forecast, data.fore[3]),
              Fore(forecast, data.fore[4]),
              Fore(forecast, data.fore[5]),
            ]),
          ],
          content
        );
      }
    });
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
  forecast.get(1062947); // Madagascar
  return app;
};

export default App;
