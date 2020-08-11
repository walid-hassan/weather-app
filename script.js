document.querySelector('.city-input input').value = '';
window.addEventListener('load', function(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( position => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=4587ebe0a8ea3ecc5c720cacafd3c17a`
            fetch (api)
            .then(response => response.json())
            .then(data => {
                let {temp} = data.main; 
                let {description, icon } = data.weather[0];
                let {name} = data;
                showdata(data);
                showIcons(data);
            })
            .catch((error) => {
                alert('Invalid Input');
              })
        })    
    }
})
document.querySelector('.city-input button').addEventListener('click', function(){
    let city = document.querySelector('.city-input input').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4587ebe0a8ea3ecc5c720cacafd3c17a`)
     .then(response => response.json())
    .then(data => { 
        console.log(data);
       showdata(data);
       document.querySelector('.icon').innerHTML = "";
        showIcons(data);
        document.querySelector('.city-input input').value = '';
        document.querySelector('.error-mes').style.display = 'none';
    })
    .catch((error) => {
        document.querySelector('.error-mes').style.display = 'block';
      })

})
function kalvinToCelcious(n){
    let celcious = Math.round(n) - 273;
    return celcious;
}
function showdata(data){
    let {temp} = data.main; 
       let {description, icon } = data.weather[0];
       let {name} = data; 
       document.getElementById('temp').innerText = kalvinToCelcious(temp) + '°c';
       document.getElementById('description').innerText = description;
       document.getElementById('cityName').innerText = name;
}
function showIcons(data){
       const iconP = document.querySelector('.icon');
       let { icon } = data.weather[0]
       let iconImage = document.createElement('img');
       iconImage.src = `http://openweathermap.org/img/w/${icon}.png`;
       iconP.appendChild(iconImage);
}