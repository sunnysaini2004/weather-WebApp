const apiKey = "adefdeddacb9088f3436a860237d3815";

const weatherDataEle = document.querySelector(".weather-data");
const cityNameEle = document.querySelector("#city-name");
const formEle = document.querySelector("form");
const imgIcon = document.querySelector(".icon");

formEle.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityNameEle.value.trim();

    if (cityValue !== "") {
        getWeatherData(cityValue);
    }
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
                cityValue
            )}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("Server Down Due to Heavy Traffic");
        }

        const data = await response.json();

        const temperature = Math.floor(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        const details = [
            `Feels like: ${Math.floor(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ];

        // Update UI
        weatherDataEle.querySelector(".temp").textContent = `${temperature}°C`;
        weatherDataEle.querySelector(".desc").textContent = description;

        imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="weather icon">`;

        weatherDataEle.querySelector(".details").innerHTML = details
            .map(detail => `<div>${detail}</div>`)
            .join("");

    } catch (err) {
        console.error(err);
        weatherDataEle.querySelector(".temp").textContent = "N/A";
        weatherDataEle.querySelector(".desc").textContent = "Something went wrong";
        weatherDataEle.querySelector(".details").innerHTML = "";
        imgIcon.innerHTML = "";
    }
}
