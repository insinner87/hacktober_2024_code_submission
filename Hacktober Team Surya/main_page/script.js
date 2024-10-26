async function getCoordinates() {
    try {
        const response = await fetch('https://ipinfo.io/json');
        if (!response.ok) {
            throw new Error(`Error fetching coordinates: ${response.statusText}`);
        }
        const data = await response.json();
        return data.loc.split(',');
    } catch (error) {
        console.error(error);
        return [null, null];
    }
}

async function getWeather(latitude, longitude) {
    const apiKey = '67176cbed5714d4d91f203137242410';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=yes`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching weather data: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getAddress(latitude, longitude) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    const headers = { 'User-Agent': 'myGeocoder' };
    
    try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error(`Error fetching address: ${response.statusText}`);
        }
        const data = await response.json();
        return data.display_name || 'Unknown location';
    } catch (error) {
        console.error(error);
        return 'Unknown location';
    }
}

async function displayWeather() {
    const [latitude, longitude] = await getCoordinates();
    if (latitude && longitude) {
        const weatherData = await getWeather(latitude, longitude);
        const address = await getAddress(latitude, longitude);
        
        if (weatherData) {
            const weatherDiv = document.getElementById('weather');
            weatherDiv.innerHTML = `
                <h3>Weather in ${address}</h3>
                <p>Temperature: ${weatherData.current.temp_c}°C</p>
                <p>Condition: ${weatherData.current.condition.text}</p>
            `;
        } else {
            document.getElementById('weather').innerHTML = 'Weather data unavailable.';
        }
    } else {
        document.getElementById('weather').innerHTML = 'Unable to get location.';
    }
}

// Call the displayWeather function when the page loads
window.onload = displayWeather;
