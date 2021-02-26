import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'
export default function Weather({ city }) {
  const [loading, updateLoading] = useState(true)
  const [weathers, updateWeathers] = useState({
    main: {},
    weather: []
  })
  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&appid=${process.env.weatherAPI}`)
        updateWeathers(data.list[0])
        updateLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])
  if (loading) {
    return <ClipLoader loading={loading} size={100} />
  }
  return <div>
    <div className="main-weather">
      <h2 className="title is-2" id="weather-title">   {Math.round(weathers.main.temp)}°C</h2>      <img src={`https://openweathermap.org/img/w/${weathers.weather[0].icon}.png`} id="weather-picture" alt='picture of the weather' width="80" />
    </div>
    <div>Feels like {Math.round(weathers.main.feels_like)} °C. {weathers.weather.main}</div>
    <div>{weathers.weather.icon}</div>
  </div>
}







