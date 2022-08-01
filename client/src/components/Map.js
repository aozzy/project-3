import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import axios from 'axios'
import ClipLoader from 'react-spinners/ClipLoader'
import dataC19 from './data.json'

export default function Map() {

  const [loading, updateLoading] = useState(true)
  const [cities, updateCities] = useState({})
  const [choosenCity, setChoosenCity] = useState(null)

  const [viewport, setViewport] = useState({
    latitude: 54.5260,
    longitude: 15.2551,
    width: '100vw',
    height: '100vh',
    zoom: 3.5

  })
  // useEffect(() => {
  //   async function getCities() {
  //     try {
  //       const { data } = await axios.get('https://www.trackcorona.live/api/countries')
        
  //       updateCities(data.data)

  //       updateLoading(false)
        
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   getCities()
  // }, [])

  useEffect(() => {
    
    const { data } = dataC19
    
    updateCities(data)
    updateLoading(false)
  }, [])

  if (loading) {
    return <ClipLoader loading={loading} size={100} />
  } 

  return <div>

    <ReactMapGL {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle='mapbox://styles/aozzy/ckll7cr0x22z317nn84cgk3ew'
      onViewportChange={viewport => {
        setViewport(viewport)
      }}


    >

      {cities.map(city => (
        <Marker
          key={city.location}
          latitude={city.latitude}
          longitude={city.longitude}
          

        >
          <button className='marker-btn' onClick={(event) => {
            event.preventDefault()
            setChoosenCity(city)
          }} >
            <img src='https://res.cloudinary.com/dznpk39i0/image/upload/v1614280398/vkaqxh1plbr5n2aya0pb.png' alt='icon' />
          </button>
        </Marker>

      ))}


      {choosenCity ? (
        <Popup latitude={choosenCity.latitude}
          longitude={choosenCity.longitude} onClose={() => {
            setChoosenCity(null)
          }} >
          <div>
            <h2> Confirmed Cases: {choosenCity.confirmed} </h2>
            <h2> Death Toll: {choosenCity.dead} </h2>
            <h2> Recovered: {choosenCity.recovered}  </h2>
          </div>
        </Popup>
      ) : null}
    </ReactMapGL>

  </div>


}
