import { useState } from 'react';
import './App.css';

function App() {
    const apiKey = "2eb546d412d68a97fc253929c655f54f";
    const [weatherData, setWeatherData] = useState({});
    const [city, setCity] = useState("");

    const getWeather = (event) => {
        if(event.key === "Enter") {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
                .then(response => response.json())
                .then(data => {
                    setWeatherData(data);
                    setCity("");
                });
        }
    };

    return (
        <div className="App">
            <input 
                className='inputCity' 
                placeholder='Enter city...' 
                value={city} 
                onChange={e => setCity(e.target.value)} 
                onKeyPress={getWeather}
            />

            {
                weatherData.cod === '404' ? (
                    <div>
                        <p className='errorP'>ქალაქი ნაპოვნიო არაა</p>
                    </div>
                ) : (
                    typeof weatherData.main !== 'undefined' && (
                        <div className="weatherInfo">
                            <p>{weatherData.name}</p>
                            <p>{Math.round(weatherData.main.temp)}°C</p>
                        </div>
                    )
                )
            }
        </div>
    );
}

export default App;
