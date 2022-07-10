const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateUI = (data) => {

    console.log(data)
//    const cityInfo = data.cityInfo;
//     const weather = data.weather; 

// destructure properties
 const { cityInfo, weather } = data;

    //update details template
    details.innerHTML = `
    <h5 class="my-3">${cityInfo.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    <div class="my-3">${weather.LocalObservationDateTime}</div>
    `;
   
// update the night/day icon images
 const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
 icon.setAttribute('src', iconSrc);
 
 
 let timeSrc = null;
 if(weather.IsDayTime){
     timeSrc = 'img/day.svg';
 } else {
     timeSrc = 'img/night.svg';
 }
time.setAttribute('src', timeSrc);
    //remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};

const updateCity = async (city) => {
    const cityInfo = await getCity(city);
    const weather = await getWeather(cityInfo.Key);
    
   return {cityInfo, weather};


}



cityForm.addEventListener('submit', e => {
    //preventDefault action prevents the page from refreshing
      e.preventDefault();

      // get city value
      const city = cityForm.city.value.trim();
      cityForm.reset();


      //update the ui with new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});