import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'

export default function Discover() {
  const [cities, updateCities] = useState([])
  const [loading, updateLoading] = useState(true)
  useEffect(() => {
    async function getCities() {
      try {
        const { data } = await axios.get('/api/cityscapes')
        updateCities(data)
        updateLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    getCities()
  }, [])

  if (loading) {
    return <ClipLoader loading={loading} size={100} />
  } 


  return <section className="section">
    <div className="container">
      <div className="columns is-multiline is-mobile">
        {cities.map((city, index) => {
          return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
            <Link to={`/project-3/cityscapes/discover/${city.city}`}>
              <div className="card">
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">{city.city}</p>
                    </div>
                  </div>
                </div>
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={city.image} alt={city.city} />
                  </figure>
                </div>
              </div>
            </Link>
          </div>
        })}
        <div className="column is-one-third-desktop is-half-tablet is-half-mobile">
          <Link to={'/project-3/cityscapes/discover/postcity'}>
            <div className="card">
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">Create a new city</p>
                  </div>
                </div>
              </div>
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src='https://img.icons8.com/cotton/2x/plus--v3.png' alt='Add city' />
                </figure>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </section>
}