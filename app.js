const apikey = "63727003f9747bead1ed621aa42da26c";
const api = "https://api.openweathermap.org/data/2.5/weather?q=";

const inp = document.querySelector(".search input");
const btn = document.querySelector(".search button");

const img = document.querySelector(".rainy");

async function weathercheck(city) {
    if (!city) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }

    try {
        const response = await fetch(api + city + `&units=metric&appid=${apikey}`);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".Wind").innerHTML = data.wind.speed + " km/h";

            if (data.weather[0].main === "Rain") {
                img.src = "images/rain.png";
            } else if (data.weather[0].main === "Clouds") {
                img.src = "images/clouds.png";
            } else if (data.weather[0].main === "Clear") {
                img.src = "images/clear.png";
            } else if (data.weather[0].main === "Drizzle") {
                img.src = "images/drizzle.png";
            } else if (data.weather[0].main === "Mist") {
                img.src = "images/mist.png";
            }
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        } else {
            throw new Error('Invalid city name');
        }
    } catch (error) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        console.error('Error fetching weather data:', error);
    }
}

btn.addEventListener("click", () => {
    weathercheck(inp.value.trim());
});
