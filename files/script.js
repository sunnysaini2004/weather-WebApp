const apiKey = "adefdeddacb9088f3436a860237d3815";

const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-name");

const loader = document.getElementById("loader");
const errorMsg = document.getElementById("error-msg");
const weatherCard = document.getElementById("weather-card");

const tempEle = document.getElementById("temp");
const descEle = document.getElementById("desc");
const detailsEle = document.getElementById("details");
const iconEle = document.getElementById("weather-icon");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();

    if (!city) {
        showError("Please enter a city name.");
        return;
    }

    getWeather(city);
});

async function getWeather(city) {
    resetUI();
    showLoader(true);

    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
                city
            )}&appid=${apiKey}&units=metric`
        );

        if (!res.ok) throw new Error("City not found");

        const data = await res.json();

        displayWeather(data);
    } catch (err) {
        showError(err.message || "Something went wrong");
    } finally {
        showLoader(false);
    }
}

function displayWeather(data) {
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const feels = Math.round(data.main.feels_like);
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const icon = data.weather[0].icon;

    tempEle.textContent = `${temp}°C`;
    descEle.textContent = toTitleCase(description);

    iconEle.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon">
    `;

    detailsEle.innerHTML = `
        <div>Feels Like: ${feels}°C</div>
        <div>Humidity: ${humidity}%</div>
        <div>Wind Speed: ${wind} m/s</div>
    `;

    weatherCard.classList.remove("hidden");
}

function showLoader(show) {
    loader.classList.toggle("hidden", !show);
}

function showError(message) {
    errorMsg.textContent = message;
    errorMsg.style.display = "block";
}

function resetUI() {
    errorMsg.style.display = "none";
    weatherCard.classList.add("hidden");
}

function toTitleCase(str) {
    return str
        .split(" ")
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}
