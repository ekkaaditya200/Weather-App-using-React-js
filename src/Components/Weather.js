import React, { useEffect, useState } from 'react';
import './Weather.css';
import Display from './Display';

const Weather = () => {
    const [weather, setWeather] = useState([]);

    const APIKEY = "9b07ae96f1d5e6c53eda4772b5b6c5f5";

    const [form, setForm] = useState({
        city: "Ranchi",
        country: "India"
    })

    useEffect(()=>{
        fetchData();
    },[]);

    async function fetchData() 
    {
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&appid=${APIKEY}`)
            .then((res) => res.json())
            .then((data) => data);

        setWeather({
            data: data
        });

    }

    async function weatherData(e) {
        e.preventDefault();
        if (form.city === "") {
            alert("Add City or Country Name");
        }
        else {
            fetchData();
        }
    }

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if (name === 'city') {
            setForm({ ...form, city: value });
        }

        if (name === 'country') {
            setForm({ ...form, country: value });
        }
    }
    return (

        <div className='weather'>

            <span className='title'>Weather App</span>

            <form>
                <input
                    type="text"
                    name="city"
                    placeholder='city'
                    onChange={e => handleChange(e)}
                ></input>

                <input
                    type="text"
                    name="country"
                    placeholder='country'
                    onChange={e => handleChange(e)}
                ></input>

                <button className='getweather' onClick={(e) => weatherData(e)}>Submit</button>
            </form>

            {weather.data !== undefined ? (
                    <Display data={weather.data}></Display>
            ) : null}

        </div>
    )
}

export default Weather;
