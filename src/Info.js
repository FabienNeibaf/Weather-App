const Info = data => {
  const { city, list } = data;
  const days = [];
  const date = null;
  let current = {};
  let count = 0;
  list.forEach(item => {
    if (date !== new Date(item.dt_txt.split(' ')[0])) {
      count = 1;
      current = {
        date: item.dt_txt,
        wind: item.wind.speed,
        clouds: item.clouds.all,
        humidity: item.main.humidity,
        pressure: item.main.pressure,
        icon: item.weather[0].icon,
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        weather: item.weather[0].main,
        description: item.weather[0].description,
      };
    } else {
      current;
    }
  });
  return { city: city.name, days };
};

export default Info;
