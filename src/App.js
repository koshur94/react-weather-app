import React, {useState} from 'react';
import './App.css';

const api = {
  key: '469b41b262b19586de1efb735ea14487',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = e => {
    if(e.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
          .then(res => res.json())
          .then(result => {
            setWeather(result);
            setQuery('');
          });
    }
  };


  const dateBuilder = d => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `Today: ${date} ${month} ${year}`
  };

    const cls = [
        'App'
    ];
    if (typeof weather.main == 'undefined') {
      cls.push('')
    } else if (weather.weather[0].description === 'clear sky') {
      cls.push('clearsky')
    } else if (weather.weather[0].description === 'moderate rain') {
      cls.push('moderaterain')
    } else if (weather.weather[0].description === 'light snow') {
      cls.push('lightsnow')
    } else if (weather.weather[0].description === 'overcast clouds') {
      cls.push('overcastclouds')
    } else if (weather.weather[0].description === 'broken clouds') {
      cls.push('brokenclouds')
    } else if (weather.weather[0].description === 'fog') {
      cls.push('fog')
    } else if (weather.weather[0].description === 'light intensity shower rain') {
      cls.push('showerrain')
    } else if (weather.weather[0].description === 'few clouds') {
      cls.push('fewclouds')
    } else if (weather.weather[0].description === 'scattered clouds') {
      cls.push('scatteredclouds')
    } else if (weather.weather[0].description === 'light rain') {
      cls.push('lightrain')
    } else if (weather.weather[0].description === 'haze') {
      cls.push('haze')
    } else if (weather.weather[0].description === 'mist') {
      cls.push('mist')
    } else if (weather.weather[0].description === 'thunderstorm with light rain') {
      cls.push('thunderstorm')
    }


  return (
    <div className={cls.join(' ')}>
      <main>
        <div className='search-box'>
          <input
              type='text'
              className='search-bar'
              placeholder='Search...'
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
          />
        </div>
        {(typeof weather.main != 'undefined') ? (
            <div>
                <div className="location-box">
                  <div className="location">{weather.name} <br/> {weather.sys.country}</div>
                  <div className="date">{dateBuilder(new Date())}</div>
                </div>
                <div className="weather-box">
                  <div className="temp">{Math.round(weather.main.temp)}°C</div>
                  <div className="weather">{weather.weather[0].main}</div>
                  <div className="description">{weather.weather[0].description}</div>
                </div>
                <div className='footer'>
                  {'Weather App by Herman Koshur, ' + new Date().getFullYear()}
                </div>
            </div>
        ) : (
            <div className="location-box">
              <div className="location">Weather App</div>
              <div className="date">by Herman Koshur</div>
            </div>
        )}
      </main>
    </div>
  );
}

export default App;
