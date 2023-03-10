import React, { useState, useEffect } from "react";
import Restaurants from "./Restaurants.js";
import ThingsToDo from "./ThingsToDo.js";
import axios from "axios";
import { isCreator } from "../lib/auth";
import Weather from "./Weather.js";
import CommentsAllTogether from "./Experiences.js";

export default function City({ match }) {
  const [buttonNum, updateButtonNum] = useState(1);
  const city = match.params.city;
  const token = localStorage.getItem("token");

  const [cities, updateCities] = useState({});
  useEffect(() => {
    async function fetchCityData() {
      try {
        const { data } = await axios.get(`/api/cityscapes/${city}`);
        updateCities(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCityData();
  }, []);

  async function handleDelete() {
    await axios.delete(`/api/cityscapes/${city}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    history.push("/cityscapes");
  }

  function DisplayInfo() {
    return (
      <div className="about-section">
        <div className="column is-centered">
          <div className="card-content">
            <h2 className="title is-2">About the city </h2>
            <p>{cities.about}</p>
            <h5 className="title is-5" id="h5-city">
              Other information{" "}
            </h5>
            <p>
              <strong>Country: </strong>
              {cities.country}
            </p>
            <p>
              <strong>Currency: </strong>
              {cities.currency}
            </p>
            <p>
              <strong>Continent: </strong>
              {cities.continent}
            </p>

            <h5 className="title is-5" id="h5-city">
              Current weather
            </h5>
            {
              <div>
                <Weather city={city} />
              </div>
            }
          </div>
        </div>
      </div>
    );
  }

  if (!cities.user) {
    return null;
  }

  return (
    <section className="main-city-section">
      <div className="container">
        <div className="cities">
          <section className="hero is-medium is-primary">
            <div
              className="hero-body"
              style={{
                backgroundImage: `url(${cities.image})`,
              }}
            >
              <p className="title" id="hero-title">
                {cities.city}
              </p>
              <p className="subtitle"></p>
            </div>
          </section>

          <section className="city">
            <article id="citylayout">
              <div className="citymenu">
                <nav className="breadcrumb is-medium" aria-label="breadcrumbs">
                  <ul>
                    <li>
                      <button
                        onClick={() => updateButtonNum(1)}
                        className="button is-info is-light"
                        id="citybuttons"
                      >
                        About
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => updateButtonNum(2)}
                        className="button is-info is-light"
                        id="citybuttons"
                      >
                        Things to do
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => updateButtonNum(3)}
                        className="button is-info is-light"
                        id="citybuttons"
                      >
                        Restaurants
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => updateButtonNum(4)}
                        className="button is-info is-light"
                        id="citybuttons"
                      >
                        Experiences
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="container is-centered" id="city-main">
                <div className="cityContent">
                  {buttonNum === 1 && (
                    <div className="box">
                      <DisplayInfo />
                    </div>
                  )}
                  {buttonNum === 3 && (
                    <div className="box">
                      <Restaurants city={city} />
                    </div>
                  )}
                  {buttonNum === 2 && (
                    <div className="box">
                      <ThingsToDo city={city} />
                    </div>
                  )}
                  {buttonNum === 4 && (
                    <div className="box">
                      <CommentsAllTogether city={city} />
                    </div>
                  )}

                  {isCreator(cities.user._id) && (
                    <button className="button is-danger" onClick={handleDelete}>
                      {" "}
                      Delete City
                    </button>
                  )}
                </div>
              </div>
            </article>
          </section>
        </div>
      </div>
    </section>
  );
}
