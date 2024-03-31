
const container = document.querySelector(".container");
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {
    const APIKey = '5de479074b5f847c5b4d0ff574035c2c';
    const city = document.querySelector('.search-box input').value;

    if (city == '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json().then(json => {

        if (json.cod == '404') {
            cityHide.textContent = city;
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        if (cityHide.textContent == city) {
            return;
        } else {
            
            cityHide.textContent = city;
            container.style.height = '555px';
            container.classList.add('active');
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            setTimeout(() => {
                container.classList.remove('active');
            }, 2500);

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/sun.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain-1.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow-1.png';
                    break;
                case 'Clouds':
                    image.src = 'images/clouds-1.png';
                    break;
                case 'Mist':
                    image.src = 'images/fog-1.png';
                    break;
                case 'Haze':
                    image.src = 'images/smog-1.png';
                    break;

                default:
                    image.src = 'images/cloudy-1.png';
                    break;
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

           
            const weatherBoxElement = document.querySelector('.weather-box .box');
            weatherBoxElement.classList.remove('active');
            setTimeout(() => {
                weatherBoxElement.classList.add('active');
            }, 1000);

        }

    }))
})


