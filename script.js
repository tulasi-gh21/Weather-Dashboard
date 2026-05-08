async function getWeather() {
    let city = document.getElementById("cityInput").value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    let apiKey = "ff6f0874ccad6869f1963d66a1762e3a";

    let url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        apiKey +
        "&units=metric";

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (response.ok === false) {
            document.getElementById("weatherResult").innerHTML =
                "Error: " + data.message;
            return;
        }

        document.getElementById("weatherResult").innerHTML =
            "<h2>" + data.name + "</h2>" +
            "<p>Temperature: " + data.main.temp + " °C</p>" +
            "<p>Humidity: " + data.main.humidity + "%</p>" +
            "<p>Condition: " + data.weather[0].description + "</p>" +
            "<p>Wind Speed: " + data.wind.speed + " m/s</p>";

    } catch (error) {
        document.getElementById("weatherResult").innerHTML =
            "Network error. Please check your internet connection.";
    }
}