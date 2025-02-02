const API_KEY = "12725d0ef0b649f29479f2508cef8b70"; // Replace with your API key

document.getElementById("search-btn").addEventListener("click", () => {
    const city = document.getElementById("search-input").value;
    if (city) {
        fetchWeather(city);
    }
});

async function fetchWeather(city) {
    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        const data = await res.json();

        if (data.cod !== 200) {
            alert("City not found");
            return;
        }

        updateWeatherInfo(data);
        fetchForecast(data.coord.lat, data.coord.lon);
    } catch (error) {
        console.error("Error fetching weather data", error);
    }
}

function updateWeatherInfo(data) {
    document.getElementById("city-name").textContent = data.name;
    document.getElementById("date-time").textContent = moment().format(
        "dddd, MMM D YYYY, h:mm A"
    );
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById("temperature").textContent = `${data.main.temp.toFixed(1)}°C`;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind-speed").textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

async function fetchForecast(lat, lon) {
    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=32&appid=${API_KEY}`
        );
        const data = await res.json();
        updateForecast(data);
    } catch (error) {
        console.error("Error fetching forecast data", error);
    }
}

function updateForecast(data) {
    const forecastContainer = document.getElementById("forecast-container");
    forecastContainer.innerHTML = "";

    const dailyForecast = {};

    data.list.forEach((entry) => {
        const date = moment(entry.dt_txt).format("YYYY-MM-DD");
        if (!dailyForecast[date]) {
            dailyForecast[date] = entry;
        }
    });

    Object.values(dailyForecast)
        .slice(1, 5)
        .forEach((day) => {
            const forecastDiv = document.createElement("div");
            forecastDiv.classList.add("forecast-day");
            forecastDiv.innerHTML = `
                <h4>${moment(day.dt_txt).format("ddd")}</h4>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="weather icon">
                <p>${day.main.temp.toFixed(1)}°C</p>
            `;
            forecastContainer.appendChild(forecastDiv);
        });
}

// Default location on load
fetchWeather("New York");
