const container=document.querySelector('.container');
const search=document.querySelector('.search-box button');
const weatherBox =document.querySelector('.weather-box');
const weatherDetails=document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click',()=>{

    const APIKey = '35d1db974d48402b46c3864b9ff525ff';
    const city = document.querySelector('.search-box input').value;

    if (city =='')
    return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
        console.log(json);
        if (json.cod == '404') { 
            container.style.height = '400px'; 
            weatherBox.classList.remove('active'); 
            weatherDetails.classList.remove('active');
             error404.classList.add('active'); return;

        }
        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        const image = document.querySelector('.weather img');
            const temperature = document.querySelector('.temperature');
            const description = document.querySelector('.description');
            const humidity = document.querySelector('.info-humidity span');
            const wind = document.querySelector('.info-wind span');
            
        console.log(json.weather[0].main);

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'img/sun.png'; break;
            case 'Rain':
                image.src = 'img/rain.png'; break;
            case 'Snow':
                image.src = 'img/snow.png'; break;
            case 'Clouds':
                image.src = 'img/cloudy.png'; break;
            case 'Mist':
                image.src ='img/windy.png'; break;
            case 'Haze':       
                image.src ='img/windy.png'; break;
            default:
                image.src='img/cloudy.png';
        }
    temperature.innerHTML=`${parseInt(json.main.temp)}<span>°C</span>`;
    description.innerHTML=`${json.weather[0].description}`;
    humidity.innerHTML=`${json.main.humidity}%`;
    wind.innerHTML=`${parseInt(json.wind.speed)}Km/h`;

    });
});
