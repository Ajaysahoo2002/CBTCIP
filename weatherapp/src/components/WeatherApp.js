import React, { useState } from 'react'
import "./weather.css"
import DayTime from './DayTime';


const WeatherApp = () => {
    const [city, setCity] = useState();
    const [weatherDetails, setWeatherDetails] = useState([]);


    const fetchWeatherData = async (e) => {
        e.preventDefault();
        try {
            const secret_key = "cd491fcef26b4dcf6b666357ad21c4c8"
            const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${secret_key}`
            const response = await fetch(URL);
            const jsonData = await response.json();
            // console.log(jsonData);
            const feelsLike = jsonData.main.feels_like;
            const hmdity = jsonData.main.humidity;
            const windspeed = jsonData.wind.speed;
            const temp = jsonData.main.temp;
            const mintemp = jsonData.main.temp_min;
            const maxtemp = jsonData.main.temp_max;
            const weatherIcon = jsonData.weather[0].icon;
            const weatherDesc = jsonData.weather[0].description;
            setWeatherDetails({ feelsLike, hmdity, temp, mintemp, maxtemp, windspeed, weatherIcon, weatherDesc });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='weatherApp'>
            <div className="mainContainer">
                <div className=" leftSection">
                    <form onSubmit={fetchWeatherData}>
                        <input type="search" name="search" id="search" value={city} onChange={(e) => { setCity(e.target.value) }} placeholder='search city...' autoComplete='off' />
                    </form>
                    <div className="weatherIcon">
                        <img src={`https://openweathermap.org/img/wn/${weatherDetails.weatherIcon}@2x.png`} alt="not found!" />
                        <p>{weatherDetails.weatherDesc}</p>
                    </div>
                    <div className="weatherDescription">
                        <div className="feelsLike">
                            <h3>feelsLike</h3><span>{weatherDetails.feelsLike}<sup>o</sup> c</span>
                        </div>
                        <div className="humidity">
                            <h3>humidity</h3><span>{weatherDetails.hmdity} %</span>
                        </div>
                        <div className="wind">
                            <h3>Wind</h3><span>{weatherDetails.windspeed} meter/s</span>
                        </div>
                        <div className="minTemp">
                            <h3>Min Temp.</h3><span>{weatherDetails.mintemp}<sup>o</sup> c</span>
                        </div>
                        <div className="maxTemp">
                            <h3>Max Temp.</h3><span>{weatherDetails.maxtemp}<sup>o</sup> c</span>
                        </div>

                    </div>
                </div>
                <div className="rightSection">
                    <div className="rightSubSection">
                        <div className="topContainer">
                            <h1>{city}</h1>
                        </div>
                        <div className="bottomContainer">
                            <div className="degree">
                                <h1>{weatherDetails.temp}<span><sup>o</sup> c</span></h1>
                            </div>
                            <div className="bottomDescription">
                                <DayTime />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default WeatherApp
