


const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '61e8cdc1b5msh8e3c747a201825fp1ee047jsnc1eda62100ce',
        'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
    }
};

// Get DOM Elements
const cityInput = document.getElementById("city");
const submitBtn = document.getElementById("submit");
const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");

// Weather detail spans
const cloud = document.getElementById("cloud");
const wind_mph = document.getElementById("wind_mph");
const temperature_in_celsius = document.getElementById("temperature_in_celsius");
const temperature_in_fahrenheit = document.getElementById("temperature_in_fahrenheit");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const visibility = document.getElementById("visibility");
const feelslike_c = document.getElementById("feelslike_c");
const feelslike_f = document.getElementById("feelslike_f");
const wind_dir = document.getElementById("wind_dir");
const precip_mm = document.getElementById("precip_mm");

// Fetch Weather Function
const getWeather = async (city) => {
    try {
        cityName.innerHTML = "Weather for " + city;

        const response = await fetch(
            `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`,
            options
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        const current = data.current;

        // Update weather cards
        cloud.innerHTML = current.cloud + " %";
        wind_mph.innerHTML = current.wind_mph;
        temperature_in_celsius.innerHTML = current.temp_c;
        temperature_in_fahrenheit.innerHTML = current.temp_f;
        condition.innerHTML = current.condition.text;
        humidity.innerHTML = current.humidity + " %";
        visibility.innerHTML = current.vis_km + " km";
        feelslike_c.innerHTML = current.feelslike_c;
        feelslike_f.innerHTML = current.feelslike_f;
        wind_dir.innerHTML = current.wind_dir;
        precip_mm.innerHTML = current.precip_mm + " mm";

        // Show weather icon
        if (current.condition.icon) {
            weatherIcon.src = "https:" + current.condition.icon;
            weatherIcon.style.display = "inline-block";
        } else {
            weatherIcon.style.display = "none";
        }

    } catch (error) {
        cityName.innerHTML = "❌ " + error.message;
        weatherIcon.style.display = "none";
        console.log(error);
    }
};

// Handle search
submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) getWeather(city);
});

// Handle dropdown links (Delhi, London, Bangalore)
document.querySelectorAll(".dropdown-item").forEach((item) => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        const city = e.target.innerText;
        getWeather(city);
    });
});

// Fetch common places dynamically
const commonCities = ["Lucknow", "Noida", "Kashmir", "Kolkata", "Kerala", "Goa"];
const tableBody = document.getElementById("commonPlaces");

const loadCommonPlaces = async () => {
    tableBody.innerHTML = ""; // clear old data
    for (const city of commonCities) {
        try {
            const response = await fetch(
                `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`,
                options
            );
            const data = await response.json();
            const current = data.current;

            const row = `
                <tr>
                    <th scope="row" class="text-start">${city}</th>
                    <td>${current.air_quality ? current.air_quality["pm2_5"].toFixed(2) : "N/A"}</td>
                    <td>${current.cloud} %</td>
                    <td>${current.temp_c} °C</td>
                    <td>${current.temp_f} °F</td>
                    <td>${current.wind_mph} mph</td>
                    <td>${current.wind_kph} kph</td>
                </tr>
            `;
            tableBody.insertAdjacentHTML("beforeend", row);
        } catch {
            const row = `
                <tr>
                    <th scope="row" class="text-start">${city}</th>
                    <td colspan="6">❌ Data not available</td>
                </tr>
            `;
            tableBody.insertAdjacentHTML("beforeend", row);
        }
    }
};

// Initial Load
getWeather("Delhi");
loadCommonPlaces();








