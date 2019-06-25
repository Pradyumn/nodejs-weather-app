const weatherForm = document.querySelector('form');
const search = document.querySelector('.search-txt');
const para = document.querySelector('#forecast');

const locationName = document.querySelector('#location-name')
const weatherSummary = document.querySelector('#summary');
const forecastTemp = document.querySelector('#temperature');
const bodyBg = document.querySelector('#bg-map');

// HERE api url for map image
const mapURL = 'https://image.maps.api.here.com/mia/1.6/mapview?c=';
const apiAuth = '&z=14&w=1920&h=891&f=1&app_id=lLiXSBfXfsTMlzR7nXwV&app_code=dHlYxhnFmws7_TQB2JmhGQ';

weatherForm.addEventListener('submit', (e) => {
    // preventing page reload
    e.preventDefault();

    const location = search.value;
    const url = '/weather?location=' + encodeURIComponent(location);

    fetch(url).then((response) => {
        response.json().then((data) => { 
            locationName.innerHTML = '<h2>' + data.location + '</h2>';
            forecastTemp.innerHTML = '<h1>' + data.temp + '</h1>';
            weatherSummary.innerHTML = '<h3>' + data.summary + '</h3>';

            const coordinates =  data.latitude + ',' + data.longitude;
            bodyBg.style.backgroundImage = 'url(\'' + mapURL + encodeURIComponent(coordinates) + apiAuth + '\')';
            console.log(mapURL + encodeURIComponent(coordinates) + apiAuth);
            console.log(data);
        });
    });
});