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
            ).catch(error => console.log("Error: ", error))
        setPlace('');
    }
    console.log(placeInfo.condition?.toLowerCase());

    function tempCondition() {
        if (placeInfo.condition?.toLowerCase() === 'clear' || placeInfo.condition?.toLowerCase() === 'sunny') {
            return "Ensolarado"
        }
        if (placeInfo.condition?.toLowerCase().includes('cloudy')) {
            return "Nublado"
        }
        if (placeInfo.condition?.toLowerCase().includes('overcast')) {
            return "Nublado"
        }
        if (placeInfo.condition?.toLowerCase().includes('rainy')) {
            return "Chuvoso"
        }
        if (placeInfo.condition?.toLowerCase().includes('snow')) {
            return "Neve"
        }
        if (placeInfo.condition?.toLowerCase().includes('thunder')) {
            return "Trovoada"
        }
        if (placeInfo.condition?.toLowerCase().includes('sleet')) {
            return "Chovendo"
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
                        <h1 className='condition'>{tempCondition() ? tempCondition() : placeInfo.condition}</h1>
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
