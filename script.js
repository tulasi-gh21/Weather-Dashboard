let apiKey = "ff6f0874ccad6869f1963d66a1762e3a";

async function getWeather() {

    let city = document.getElementById("cityInput").value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    getWeatherData(city);
}

async function getWeatherData(city) {

    let weatherUrl =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        encodeURIComponent(city) +
        "&appid=" +
        apiKey +
        "&units=metric";

    let forecastUrl =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        encodeURIComponent(city) +
        "&appid=" +
        apiKey +
        "&units=metric";

    try {

        let weatherResponse = await fetch(weatherUrl);

        let weatherData = await weatherResponse.json();

        if (weatherResponse.ok === false) {

            document.getElementById("weatherResult").innerHTML =
                "Error: " + weatherData.message;

            return;
        }

        let iconCode = weatherData.weather[0].icon;

        let iconUrl =
            "https://openweathermap.org/img/wn/" +
            iconCode +
            "@2x.png";

        document.getElementById("weatherResult").innerHTML =

            '<div class="weather-card">' +

            "<h2>" + weatherData.name + "</h2>" +

            '<img src="' + iconUrl + '" alt="Weather Icon">' +

            "<p>Temperature: " +
            weatherData.main.temp +
            " °C</p>" +

            "<p>Humidity: " +
            weatherData.main.humidity +
            "%</p>" +

            "<p>Condition: " +
            weatherData.weather[0].description +
            "</p>" +

            "<p>Wind Speed: " +
            weatherData.wind.speed +
            " m/s</p>" +

            "</div>";

        let forecastResponse = await fetch(forecastUrl);

        let forecastData = await forecastResponse.json();

        let forecastHTML =
            '<div class="forecast-container">';

        for (let i = 0; i < 5; i++) {

            let item = forecastData.list[i * 8];

            let forecastIcon =
                "https://openweathermap.org/img/wn/" +
                item.weather[0].icon +
                "@2x.png";

            forecastHTML +=

                '<div class="forecast-card">' +

                "<h4>" +
                item.dt_txt.split(" ")[0] +
                "</h4>" +

                '<img src="' +
                forecastIcon +
                '" alt="Forecast Icon">' +

                "<p>" +
                item.main.temp +
                " °C</p>" +

                "<p>" +
                item.weather[0].description +
                "</p>" +

                "</div>";
        }

        forecastHTML += "</div>";

        document.getElementById("forecast").innerHTML =
            forecastHTML;

    } catch (error) {

        document.getElementById("weatherResult").innerHTML =
            "Error loading weather data.";
    }
}

function getCurrentLocationWeather() {

    navigator.geolocation.getCurrentPosition(

        async function (position) {

            let lat = position.coords.latitude;

            let lon = position.coords.longitude;

            let url =
                "https://api.openweathermap.org/data/2.5/weather?lat=" +
                lat +
                "&lon=" +
                lon +
                "&appid=" +
                apiKey +
                "&units=metric";

            let response = await fetch(url);

            let data = await response.json();

            getWeatherData(data.name);
        }
    );
}
