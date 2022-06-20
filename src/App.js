import { useEffect, useState } from 'react';
import './App.css';
import Clear from "./assets/clear.jpg";
import Cloudy from "./assets/cloudy.jpg";
import Overcast from "./assets/overcast.jpg";
import Rainy from "./assets/rainy.jpg";
import Snow from "./assets/snow.jpg";
import SearchIcon from "@mui/icons-material/Search";
function App() {
    const [place, setPlace] = useState('Aracaju');
    const [placeInfo, setPlaceInfo] = useState({});
    useEffect(() => {
        handleFetch();
    }, [])

    const handleFetch = () => {
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=9a376f7c7303469195355849222006&q=${place}&days=1&aqi=no&alerts=no`)
            .then(response => response.json())
            .then(data => setPlaceInfo({
                name: data.location.name,
                country: data.location.country,
                celsius: {
                    current: data.current.temp_c,
                    high: data.forecast.forecastday[0].day.maxtemp_c,
                    low: data.forecast.forecastday[0].day.mintemp_c
                },
                condition: data.current.condition.text,
            })
            ).catch(error => console.log(error));
        setPlace('');
    }


    function tempCondition() {
        if (placeInfo.condition === 'Sunny') {
            return "Ensolarado";
        }

        if (placeInfo.condition === "Light rain" || placeInfo.condition === "Light rain shower") {
            return 'Chuva leve';
        }
        if (placeInfo.condition === "Overcast") {
            return 'Nublado';
        }
        if (placeInfo.condition === "Patchy rain possible") {
            return 'Chuva possível';
        }
        if (placeInfo.condition === "Partly cloudy") {
            return 'Poucas nuvens';
        }
        if (placeInfo.condition === "Mist") {
            return 'Nublado';
        }
        if (placeInfo.condition === "Heavy rain") {
            return 'Chuva pesada';
        }
        if (placeInfo.condition === "Light snow") {
            return 'Neve leve';
        }
        if (placeInfo.condition === "Heavy snow") {
            return 'Neve pesada';
        }
        if (placeInfo.condition === "Light sleet") {
            return 'Geada leve';
        }
        if (placeInfo.condition === "Heavy sleet") {
            return 'Geada pesada';
        }
        if (placeInfo.condition === "Light rain and snow") {
            return 'Chuva e neve leve';
        }
        if (placeInfo.condition === "Heavy rain and snow") {
            return 'Chuva e neve pesada';
        }
        //other conditions
        else {
            return placeInfo.condition;
        }
    }


    return (

        <div
            className="app"
            style={
                placeInfo.condition?.toLowerCase() === "clear" ||
                    placeInfo.condition?.toLowerCase() === "sunny"
                    ? { backgroundImage: `url(${Clear})` }
                    : placeInfo.condition?.includes("cloudy")
                        ? { backgroundImage: `url(${Cloudy})` }
                        : placeInfo.condition?.toLowerCase().includes("rainy")
                            ? { backgroundImage: `url(${Rainy})` }
                            : placeInfo.condition?.toLowerCase().includes("snow")
                                ? { backgroundImage: `url(${Snow})` }
                                : { backgroundImage: `url(${Overcast})` }
            }
        >
            <div className="search-input">
                <input
                    type="text"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                />
                <SearchIcon
                    onClick={handleFetch}
                    fontSize="large"
                    className="search-button"
                />
            </div>
            <div className="weather-container">
                <div className="top-part">
                    <h1>{placeInfo.celsius?.current}°C</h1>
                    <div className="condition-high-low">
                        <h1 className='condition'>{tempCondition()}</h1>
                        <h2>min. {placeInfo.celsius?.low}°C</h2>
                        <h2>max. {placeInfo.celsius?.high}°C</h2>
                    </div>
                </div>
                <h2>
                    {placeInfo.name}, {placeInfo.country}
                </h2>
            </div>
        </div>
    );


}



export default App;
