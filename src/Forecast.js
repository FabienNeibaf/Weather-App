import Info from './Info';
import cities from './city.list.json';

export default class Forecast {
  constructor() {
    this.info = null;
    this.data = null;
    this.cities = cities;
    this.upTodate = false;
  }

  async get(id) {
    let info = JSON.parse(localStorage.getItem('weather.forecast'));
    if (info) return info;
    info = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=f61acd58d6e808934570a8fec6f4c8a7`,
      { mode: 'cors' }
    )
      .then(response => response.json())
      .then(data => {
        this.data = data;
        this.upTodate = true;
        return Info(data);
      });
    this.info = info;
    localStorage.setItem('weather.forecast', JSON.stringify(info));
    setTimeout(() => {
      this.upTodate = false;
    }, 15000);
    // if (!(this.data && this.data.city.id === id && this.upTodate)) {
    //   this.update(id);
    // }
    return info;
  }

  getCities() {
    return this.cities;
  }
}

// Forecast.prototype.getInfo = function() {
//   const info = JSON.parse(localStorage.getItem('weather.forecast'));
//   if (!info) this.get().then(data => (info = data));
//   return info;
// };
