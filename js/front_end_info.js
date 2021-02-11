async function getInitialData() {
  try {
    const res = await fetch("http://localhost:4567/");

    const data = await res.json();

    console.log(data);
    showData(data);
  } catch (e) {
    console.error(e);
  }
}

getInitialData();

const btnConsulta = document
  .querySelector("#btnConsulta")
  .addEventListener("click", () => {
    const select = document.querySelector("#selectRegion");
    const value = select.options[select.selectedIndex].value;

    (async function getSelectedData() {
      try {
        const res = await fetch(
          "http://localhost:4567/selectregion?id=" + value
        );

        const data = await res.json();

        clearData();
        showData(data);
      } catch (e) {
        console.error(e);
      }
    })();
  });

const label_city = document.querySelector("#city");
const label_date = document.querySelector("#date");
const label_description = document.querySelector("#description");
const label_humidity = document.querySelector("#humidity");
const label_temperature = document.querySelector("#temp");

function showData({ city, date, description, humidity, temp, forecast }) {
  label_city.innerHTML = city;
  label_date.innerHTML = date;
  label_description.innerHTML = description;
  label_humidity.innerHTML = `Humidade: ${humidity} kg/m³`;
  label_temperature.innerHTML = `Temperatura: ${temp} ºC`;

  for (let i = 1; i <= 4; i++) {
    document.querySelectorAll(".forecast")[
      i - 1
    ].innerHTML = `${forecast[i].weekday} - 
        ${forecast[i].date} <br /> ${forecast[i].description} <br /> 
        Temp. Min.: ${forecast[i].min} - Temp. Max.: ${forecast[i].max}`;
  }
}

function clearData() {
  label_city.innerHTML = "";
  label_date.innerHTML = "";
  label_description.innerHTML = "";
  label_humidity.innerHTML = "";
  label_temperature.innerHTML = "";

  for (let i = 1; i <= 4; i++) {
    document.querySelectorAll(".forecast")[i - 1].innerHTML = "";
  }
}
