const degree = temp => Math.round(temp - 273.15);

const Info = data => {
  const { city, list } = data;
  const fore = list.map(item => ({
    clouds: item.clouds.all,
    icon: item.weather[0].icon,
    date: new Date(item.dt_txt),
    humidity: item.main.humidity,
    pressure: item.main.pressure,
    temp: degree(item.main.temp),
    rain: item.rain && item.rain['3h'],
    weather: item.weather[0].description,
    wind: Math.round(item.wind.speed * 10) / 10,
  }));
  return { city, fore };
};

export default Info;
