async function fetchWeather() {
  const city = document.getElementById("city");
  const weatherInfo = document.getElementById("weatherInfo");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const humidity = document.getElementById("humidity");
  const wind = document.getElementById("wind");
  const dynamicBg = document.getElementById("dynamicBg");

  if (!city.value) {
    alert("Please enter a city name");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=392fc470c1ac8b42b2f40951a9a96cc4&units=metric`
    );

    const data = await response.json();

    if (data.cod === "404") {
      alert("City not found!");
      return;
    }

    // Update UI with weather data
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind Speed: ${data.wind.speed} km/h`;

    // Update background dynamically
    const weatherMain = data.weather[0].main.toLowerCase();

    if (weatherMain.includes("cloud")) {
      dynamicBg.style.background =
        "url('https://images.unsplash.com/photo-1498085245356-7c3cda3b412f?q=80&w=1567&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') no-repeat center center/cover";
    } else if (weatherMain.includes("rain")) {
      dynamicBg.style.background =
        "url('https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') no-repeat center center/cover";
    } else if (weatherMain.includes("clear")) {
      dynamicBg.style.background =
        "url('https://images.unsplash.com/photo-1496765111150-918497b59c9e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') no-repeat center center/cover";
    } else {
      dynamicBg.style.background =
        "url('https://images.unsplash.com/photo-1561553590-267fc716698a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fDE2MDB4OTAwJTJGJTNGd2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D') no-repeat center center/cover";
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Unable to fetch weather data. Please try again.");
  }
}
