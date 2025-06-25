const wetfor = document.querySelector(".wefo");
const cityinput = document.querySelector(".cit");
const card = document.querySelector(".card");
const errorDisplay = document.querySelector(".error");
const apiKey = "95f411f830dfaa11e0ab9d898deb9ae1";

console.log("JavaScript loaded ✅");

wetfor.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityinput.value.trim();
  console.log("Form submitted with city:", city);

  if (city) {
    try {
      const weatherdata = await getWeather(city);
      displayweather(weatherdata);
    } catch (error) {
      console.log(error);
      displayerror("Could not fetch weather.");
    }
  } else {
    displayerror("Please enter a city");
  }
});

async function getWeather(city) {
  const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  console.log("API URL:", apiurl);

  const response = await fetch(apiurl);
  if (!response.ok) {
    throw new Error("API call failed");
  }
  const data = await response.json();
  console.log("API response:", data);
  return data;
}

function displayweather(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id, icon }],
  } = data;

  card.innerHTML = ""; // Clear previous
  errorDisplay.style.display = "none";

  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  const iconImg = document.createElement("img");
  iconImg.src = iconUrl;
  iconImg.alt = "Weather icon";
  iconImg.classList.add("weather-icon");

  const contentWrapper = document.createElement("div");
  contentWrapper.classList.add("weather-content");

  const citydisplay = document.createElement("h1");
  citydisplay.textContent = city;
  citydisplay.classList.add("city");

  const tempdisplay = document.createElement("p");
  tempdisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  tempdisplay.classList.add("temp");

  const humiddisplay = document.createElement("p");
  humiddisplay.textContent = `Humidity: ${humidity}%`;
  humiddisplay.classList.add("humid");

  const desdisplay = document.createElement("p");
  desdisplay.textContent = `${description}`;
  desdisplay.classList.add("des");

  const emodisplay = document.createElement("p");
  emodisplay.textContent = getweaemoji(id);
  emodisplay.classList.add("wethemo");

  contentWrapper.appendChild(citydisplay);
  contentWrapper.appendChild(tempdisplay);
  contentWrapper.appendChild(humiddisplay);
  contentWrapper.appendChild(desdisplay);
  contentWrapper.appendChild(emodisplay);

  card.appendChild(iconImg);
  card.appendChild(contentWrapper);
  card.style.display = "flex";
}

function getweaemoji(wethid) {
  switch (true) {
    case wethid >= 200 && wethid < 300:
      return "⛈";
    case wethid >= 300 && wethid < 500:
      return "🌦";
    case wethid >= 500 && wethid < 600:
      return "🌧";
    case wethid >= 600 && wethid < 700:
      return "❄";
    case wethid >= 700 && wethid < 800:
      return "🌫";
    case wethid === 800:
      return "☀";
    case wethid > 800 && wethid < 810:
      return "☁";
    default:
      return "🌈";
  }
}

function displayerror(message) {
  card.style.display = "none";
  errorDisplay.style.display = "block";
  errorDisplay.textContent = message;
}
