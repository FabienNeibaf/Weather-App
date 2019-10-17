import Info from './Info';
import { Observable } from './utils';
import cities from './city.list.json';

export default class Forecast extends Observable {
  constructor() {
    super();
    this.info = null;
    this.update = null;
    this.cities = cities;
    this.tempUnit = 'celsius';
  }

  async get(id) {
    let { info } = this;
    if (info === null || info.city.id !== id) {
      clearInterval(this.update);
      try {
        info = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?id=${id}&cnt=6&appid=f61acd58d6e808934570a8fec6f4c8a7`,
          { mode: 'cors' }
        )
          .then(response => {
            if (response.ok) return response;
            throw new Error('Something went wrong');
          })
          .then(response => response.json())
          .then(data => Info(data));
      } catch (error) {
        info = error;
      }
      this.info = info;
      this.update = setInterval(() => this.get(id), 600000);
    }
    return info;
  }

  updateTime() {
    const now = new Date();
    this.info.fore[0].date = now;
    return now;
  }

  getCities() {
    return this.cities;
  }

  getInfo() {
    return this.info;
  }

  showIn(tempUnit) {
    this.tempUnit = tempUnit.toLowerCase();
    return this.tempUnit;
  }
}
