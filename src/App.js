import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(""); //data in the page
  const [city, setCity] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=a973f7287476defd094b47349f1d54ee`;
  //&units=imperial   change to farenheit

  const searchLoc = (e) => {
    if (e.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setCity("");
    }
  };

  //if you are only using the "Enter" then usetate above must have empty {}

  return (
    <div className="mask">
      <div className="search">
        <input
          type="text"
          placeholder="enter location"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={searchLoc}
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
            {data.main ? <h1>{data.main.temp.toFixed()} °F</h1> : null}
          </div>

          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>

        <div className="bottom">
          <div className="feels">
            {data.main ? <p>{data.main.feels_like.toFixed()} °F </p> : null}
            <p>Feels like</p>
          </div>
          <div className="humidity">
            {data.main ? <p>{data.main.humidity} %</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p>{data.wind.speed.toFixed()} mph</p> : null}
            <p>Wind</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
