# :partly_sunny: Weather App
This weather app allows you to get the forecast of a location of your choice by typing it in the search box.  
By default, the app detects your current location, and if available, use it to get the weather information.  

![Weather](https://github.com/FabienNeibaf/Portfolio/blob/master/src/images/Weather.png)

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
