// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
});

document.getElementById("weatherForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const cityInput = document.getElementById("cityInput");
  const weatherResult = document.getElementById("weatherResult");
  const city = cityInput.value;
  const apiKey = "5beb59dead6af57bc9e4d6e9bf4f00c2";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Show loading state
  weatherResult.style.display = "block";
  weatherResult.innerHTML = '<div class="loading"></div>';

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found. Please try again.");
    const data = await response.json();

    // Get weather icon
    const weatherIcon = getWeatherIcon(data.weather[0].main);

    // Format the weather data
    weatherResult.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <div class="weather-icon">
          <i class="${weatherIcon}"></i>
        </div>
        <div class="weather-details">
          <p><i class="bi bi-thermometer"></i> Temperature: ${Math.round(
            data.main.temp
          )}°C</p>
          <p><i class="bi bi-cloud"></i> Weather: ${
            data.weather[0].description
          }</p>
          <p><i class="bi bi-droplet"></i> Humidity: ${data.main.humidity}%</p>
          <p><i class="bi bi-wind"></i> Wind Speed: ${Math.round(
            data.wind.speed * 3.6
          )} km/h</p>
        </div>
      `;

    // Clear input
    cityInput.value = "";
  } catch (error) {
    weatherResult.innerHTML = `
        <div class="alert alert-danger" role="alert">
          <i class="bi bi-exclamation-triangle-fill"></i>
          ${error.message}
        </div>
      `;
  }
});

// Helper function to get weather icons
function getWeatherIcon(weatherMain) {
  const icons = {
    Clear: "wi wi-day-sunny",
    Clouds: "wi wi-cloudy",
    Rain: "wi wi-rain",
    Drizzle: "wi wi-sprinkle",
    Thunderstorm: "wi wi-thunderstorm",
    Snow: "wi wi-snow",
    Mist: "wi wi-fog",
    Fog: "wi wi-fog",
    Haze: "wi wi-day-haze",
    Smoke: "wi wi-smoke",
    Dust: "wi wi-dust",
    Sand: "wi wi-sandstorm",
    Ash: "wi wi-volcano",
    Squall: "wi wi-strong-wind",
    Tornado: "wi wi-tornado",
  };

  return icons[weatherMain] || "wi wi-na";
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(33, 37, 41, 0.95)";
    navbar.style.backdropFilter = "blur(10px)";
  } else {
    navbar.style.background = "#343a40";
    navbar.style.backdropFilter = "none";
  }
});
