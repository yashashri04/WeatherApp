const apiKey = "d7a9840aa374930c30d29feff3503af5";

let loc = document.getElementById('location');
let tempicon = document.getElementById('tempicon');
let temp = document.getElementById('temp');
let climate = document.getElementById('climate');
let searchInput = document.getElementById('searchInput');
let searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    getResults(searchInput.value);
    searchInput.value = "";
});

const getResults = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`, { mode: 'cors' });

        const data = await response.json();
        console.log(data);
        loc.innerText = data.name;
        const { feels_like } = data.main;
        const weatherInfo = data.weather[0];
        const id = weatherInfo.id;
        climate.innerText = weatherInfo.main;
        temp.innerText = Math.round(feels_like - 273);
        icon.src = `http://openweathermap.org/img/w/${weatherInfo.icon}.png`;
        document.getElementById('cityNotFound').style.display = 'none';
        document.body.style.backgroundColor='none';

        if (id < 300 && id >= 200) {
            document.body.style.backgroundImage = "url('images/thunderstrom.jpg')";
        }
        else if (id < 400 && id >= 300) {
            document.body.style.backgroundImage = "url('images/cloudy.jpg')";
        }
        else if (id < 600 && id >= 500) {
            document.body.style.backgroundImage = "url('images/rain.jpg')";
        }
        else if (id < 700 && id >= 600) {
            document.body.style.backgroundImage = "url('images/snow.jpg')";
        }
        else if (id < 800 && id >= 700) {
            document.body.style.backgroundImage = "url('images/mist.jpg')";
        }
        else if (id == 800) {
            document.body.style.backgroundImage = "url('images/sunny.jpg')";
        }
        else {
            document.body.style.backgroundImage = "url('images/clouds.jpg')";
        }
    }
    catch (error) {
        document.getElementById('cityNotFound').style.display = 'block';
        loc.innerText = "-----";
        climate.innerText = "-----";
        temp.innerText = "-----";
        icon.src = `images/doubtful.png`;

    }


};



window.addEventListener('load', () => {
    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;
            fetch(api).then((response) => {
                if (response.status >= 200 && response.status <= 299) {
                    return response.json();
                  }
                   else {
                    throw Error(response.statusText);
                  }
            })
                .then(data => {
                    console.log(data);
                    loc.innerText = data.name;
                    const { feels_like } = data.main;
                    const weatherInfo = data.weather[0];
                    const id = weatherInfo.id;
                    climate.innerText = weatherInfo.main;
                    temp.innerText = Math.round(feels_like - 273);
                    icon.src = `http://openweathermap.org/img/w/${weatherInfo.icon}.png`;
                    document.body.style.backgroundColor='none';

                    if (id < 300 && id >= 200) {
                        document.body.style.backgroundImage = "url('images/thunderstrom.jpg')";
                    }
                    else if (id < 400 && id >= 300) {
                        document.body.style.backgroundImage = "url('images/clouds.jpg')";
                    }
                    else if (id < 600 && id >= 500) {
                        document.body.style.backgroundImage = "url('images/rain.jpg')";
                    }
                    else if (id < 700 && id >= 600) {
                        document.body.style.backgroundImage = "url('images/snowy.jpg')";
                    }
                    else if (id < 800 && id >= 700) {
                        document.body.style.backgroundImage = "url('images/mist.jpg')";
                    }
                    else if (id == 800) {
                        document.body.style.backgroundImage = "url('images/sunny.jpg')";
                    }
                    else {
                        document.body.style.backgroundImage = "url('images/clouds.jpg')";
                    }


                })
                .catch((error) => {
                    document.getElementById('cityNotFound').innerText="Couldn't find your location!";
                    document.getElementById('cityNotFound').style.display = 'block';
                    icon.src = `images/doubtful.png`;
                });
        })
    }
    
})


//for displaying date
let date = new Date();
let dayArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'];
let monthArray = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
document.getElementById('date').innerText = `${dayArray[date.getDay()]},${date.getDate()} ${monthArray[date.getMonth()]} ${date.getFullYear()}`;

