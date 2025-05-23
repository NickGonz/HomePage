const hour = new Date().getHours();
let greeting = "hello";

// --- weather coords ---
const lat = 47.4668;
const lon = -122.3405;

// --- clock update ---
function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' });
}
setInterval(updateClock, 1000);
updateClock();

//--- date update ---
const date = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
document.getElementById("date").textContent = `📅 ${date}`;

// --- greetings ---

if (hour < 12) greeting = "good morning";
else if (hour < 18) greeting = "good afternoon";
else greeting = "good evening";

document.getElementById("greeting").textContent = `${greeting}, nick`;

// --- weather fetcher ---
fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=fahrenheit`)
  .then(res => res.json())
  .then(data => {
    const temp = data.current_weather.temperature;
    const weatherCode = data.current_weather.weathercode;
    const emoji = getWeatherEmoji(weatherCode);
    document.getElementById("weather").textContent = `${emoji} ${temp}°F`;
  })
  .catch(() => {
    document.getElementById("weather").textContent = "Weather unavailable";
  });

function getWeatherEmoji(code) {
  if ([0, 1].includes(code)) return "☀️";           // Clear
  if ([2, 3].includes(code)) return "⛅";           // Cloudy
  if ([45, 48].includes(code)) return "🌫️";       // Fog
  if ([51, 53, 55].includes(code)) return "🌦️";   // Drizzle
  if ([61, 63, 65].includes(code)) return "🌧️";   // Rain
  if ([66, 67].includes(code)) return "🌧️❄️";     // Freezing Rain
  if ([71, 73, 75].includes(code)) return "❄️";   // Snow
  if ([95, 96, 99].includes(code)) return "⛈️";   // Thunderstorm
  return "🌍";
}

// -- quote fetcher ---
fetch("https://api.allorigins.win/raw?url=https://zenquotes.io/api/random")
  .then(res => res.json())
  .then(data => {
    const quote = data[0].q;
    const author = data[0].a;
    document.getElementById("quote").textContent = `💬 "${quote}" — ${author}`;
  })
  .catch((err) => {
    console.error("Quote fetch error:", err);
    document.getElementById("quote").textContent = "💬 Stay focused. Stay weird.";
  });

