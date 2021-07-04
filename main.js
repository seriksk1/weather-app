let city = {
  API_KEY: "ff9d437b8a5c1fdf6bc59832839e29b8",
  current: "",

  isFavorite(currentCity) {
    return localStorage.getItem("userCity") === currentCity;
  },

  toggleFavorite() {
    if (localStorage.getItem("userCity") !== null && favorite.src.includes("not-filled")) {
      favorite.src = "img/black-heart.svg";
    } else {
      favorite.src = "img/black-heart-not-filled.svg";
      if (this.isFavorite(this.current)) {
        localStorage.removeItem("userCity");
      }
    }
  },

  search(name) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${this.API_KEY}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          document.querySelector(".city").style.display = "none";
          document.querySelector(".error").style.display = "block";
          throw Error("Wrong city");
        }
      })
      .then((data) => {
        this.current = data.name;
        this.toggleFavorite();
        this.showWeather(data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  showWeather(data) {
    document.querySelector(".city-name h2").innerText = data.name;
    document.querySelector(".city-weather-state").innerText = data.weather[0].main;
    document.querySelector(".city-humidity span").innerText = data.main.humidity;
    document.querySelector(".city-temperature span").innerText = Math.round(data.main.temp);
    document.querySelector(".weather-icon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.querySelector(".weather-icon").title = data.weather[0].main;
    document.querySelector(".city").style.display = "flex";
    document.querySelector(".error").style.display = "none";
  },
};

window.addEventListener("load", () => {
  if (localStorage.getItem("userCity") !== null) {
    city.search(localStorage.getItem("userCity"))
  }
});

const favorite = document.querySelector(".city-name img");
favorite.addEventListener("click", () => {
  localStorage.setItem("userCity", city.current);
  city.toggleFavorite();
});

document.querySelector("#search-btn")
.addEventListener("click", () => {
  city.search(document.querySelector("#searchCity").value);
});
