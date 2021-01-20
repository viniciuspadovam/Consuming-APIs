async function getInitialData() {
    try {
        const res = await fetch('http://localhost:4567/');

        const data = await res.json();

        showData(data);
    } catch (e) {
        console.error(e);
    }
}

getInitialData();

const btnConsulta = document.querySelector('#btnConsulta').addEventListener('click', () => {
    const select = document.querySelector('#selectRegion');
    const value = select.options[select.selectedIndex].value;

    (async function getSelectedData() {
        try {
            const res = await fetch('http://localhost:4567/selectregion?id=' + value);

            const data = await res.json();

            clearData();
            showData(data);
        } catch (e) {
            console.error(e);
        }
    })();
});

function showData(content) {
    document.querySelector('#city').innerHTML = content.city;
    document.querySelector('#date').innerHTML = content.date;
    document.querySelector('#description').innerHTML = content.description;
    document.querySelector('#humidity').innerHTML = `Humidade: ${content.humidity} kg/m³`;
    document.querySelector('#temp').innerHTML = `Temperatura: ${content.temp} ºC`;

    for (let i = 1; i <= 4; i++) {
        document.querySelectorAll('.forecast')[i - 1].innerHTML = `${content.forecast[i].weekday} - 
        ${content.forecast[i].date} <br /> ${content.forecast[i].description} <br /> 
        Temp. Min.: ${content.forecast[i].min} - Temp. Max.: ${content.forecast[i].max}`;
    }
}

function clearData() {
    document.querySelector('#city').innerHTML = '';
    document.querySelector('#date').innerHTML = '';
    document.querySelector('#description').innerHTML = '';
    document.querySelector('#humidity').innerHTML = '';
    document.querySelector('#temp').innerHTML = '';

    for (let i = 1; i <= 4; i++) {
        document.querySelectorAll('.forecast')[i - 1].innerHTML = '';
    }
}