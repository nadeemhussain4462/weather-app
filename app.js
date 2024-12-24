const apiKey = "392fc470c1ac8b42b2f40951a9a96cc4";

async function fetchWeather() {
  const city = document.getElementById('city').value.trim();
  const weatherDetails = document.getElementById('weather-details');
  const errorMessage = document.getElementById('error-message');
  const app = document.getElementById('app');

  if (!city) {
    errorMessage.textContent = "Please enter a city name.";
    errorMessage.classList.remove('hidden');
    weatherDetails.classList.add('hidden');
    return;
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (data.cod !== 200) {
      throw new Error(data.message);
    }

    document.getElementById('city-name').textContent = data.name;
    document.getElementById('temperature').textContent = `${data.main.temp}°C`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').textContent = `Wind: ${data.wind.speed} m/s`;

    const weatherIcon = document.getElementById('weather-icon');
    const weatherCondition = data.weather[0].main.toLowerCase();

    let backgroundClass = "bg-gray-800";
    let iconSrc = "";

    if (weatherCondition.includes("clear")) {
      backgroundClass = "bg-yellow-400";
      iconSrc = "https://cdn-icons-png.flaticon.com/512/869/869869.png"; // Sun icon
    } else if (weatherCondition.includes("cloud")) {
      backgroundClass = "bg-gray-600";
      iconSrc = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png"; // Cloud icon
    } else if (weatherCondition.includes("rain")) {
      backgroundClass = "bg-blue-900";
      iconSrc = "https://cdn-icons-png.flaticon.com/512/1146/1146858.png"; // Rain icon
    } else if (weatherCondition.includes("snow")) {
      backgroundClass = "bg-blue-300";
      iconSrc = "https://cdn-icons-png.flaticon.com/512/642/642102.png"; // Snow icon
    } else if (weatherCondition.includes("mist") || weatherCondition.includes("fog")) {
      backgroundClass = "bg-gray-500";
      iconSrc = "https://cdn-icons-png.flaticon.com/512/4005/4005901.png"; // Fog icon
    }

    app.className = `${backgroundClass} text-white font-sans transition-all duration-500`;
    weatherIcon.src = iconSrc;

    errorMessage.classList.add('hidden');
    weatherDetails.classList.remove('hidden');
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove('hidden');
    weatherDetails.classList.add('hidden');
  }

  document.getElementById('city').value = '';
}