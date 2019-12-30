# :partly_sunny: Weather App
This weather app allow you to get the forecast for a location of your choice buy searching it through the search box.  
By default it looks up your location and if available use it to deliver your current forecast.  

# Technologies

This app uses:
- Promises
- Callbacks
- APIs ( Geolocation API and OpenWeather API)
- Object Oriented Programming
- Factory Functions
- Module Pattern 
To handle the complexity of synchronizing the views with data changes, I created an Observable object on which can be attached handlers.  
The `Observable class` is located in `./src/utils.js`.  
Also the app takes care of updating the information every **10mn** as it is recommended by [OpenWeather](https://openweathermap.org/appid).  

This project is part of [microverse](https://www.microverse.org/) curriculum.  

![Weather](https://github.com/FabienNeibaf/Portfolio/blob/master/src/images/Weather.png)

# :electric_plug: Set up

To run the project:

- Clone the repository: _https://github.com/FabienNeibaf/Weather-App_
- Run `npm install`. It will install all the dependencies required by the project
- Run `npm start` to start the development server. It will automatically open the page in your default browser.

# :computer: Live demo

- https://fabienneibaf.github.io/Weather-App/

# :pencil2: Contribute

Feel free to contribute if you want to make it better.

# Author

- [Fabien RAKOTOMAMPIANDRA](https://github.com/FabienNeibaf/)
