const apiKey = "392fc470c1ac8b42b2f40951a9a96cc4";

    const backgrounds = {
      clear: "url('https://plus.unsplash.com/premium_photo-1723579336014-d2d93cf3c71d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      clouds: "url('https://plus.unsplash.com/premium_photo-1667143326260-6fcff17dfd07?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      rain: "url('https://images.unsplash.com/photo-1518803194621-27188ba362c9?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      snow: "url('https://plus.unsplash.com/premium_photo-1710248799611-96aa6db855b9?q=80&w=1506&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      mist: "url('https://plus.unsplash.com/premium_photo-1710248799611-96aa6db855b9?q=80&w=1506&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      fog: "url('https://images.unsplash.com/photo-1479476437642-f85d89e5ad7b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      thunderstorm: "url('https://plus.unsplash.com/premium_photo-1710248799611-96aa6db855b9?q=80&w=1506&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      drizzle: "url('https://images.unsplash.com/photo-1505404919723-002ecad81b92?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    };

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

        let background = backgrounds.clear;
        let iconSrc = "";

        if (weatherCondition.includes("clear")) {
          background = backgrounds.clear;
          iconSrc = "https://cdn-icons-png.flaticon.com/512/869/869869.png"; // Sun icon
        } else if (weatherCondition.includes("cloud")) {
          background = backgrounds.clouds;
          iconSrc = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png"; // Cloud icon
        } else if (weatherCondition.includes("rain")) {
          background = backgrounds.rain;
          iconSrc = "https://cdn-icons-png.flaticon.com/512/1146/1146858.png"; // Rain icon
        } else if (weatherCondition.includes("snow")) {
          background = backgrounds.snow;
          iconSrc = "https://cdn-icons-png.flaticon.com/512/642/642102.png"; // Snow icon
        } else if (weatherCondition.includes("mist") || weatherCondition.includes("fog")) {
          background = backgrounds.mist;
          iconSrc = "https://cdn-icons-png.flaticon.com/512/4005/4005901.png"; // Fog icon
        } else if (weatherCondition.includes("thunderstorm")) {
          background = backgrounds.thunderstorm;
          iconSrc = "https://cdn-icons-png.flaticon.com/512/1146/1146860.png"; // Thunderstorm icon
        } else if (weatherCondition.includes("drizzle")) {
          background = backgrounds.drizzle;
          iconSrc = "https://cdn-icons-png.flaticon.com/512/1146/1146865.png"; // Drizzle icon
        }

        app.style.backgroundImage = background;
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