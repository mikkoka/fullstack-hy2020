import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PageMainComponent from './components/PageMainComponent'


function App() {
  const [ countries, setCountries ] = useState([]) 
  const [ shownCountries, setShownCountries ] = useState([])  
  const [ filterString, setFilterString ] = useState('') 
  const [ weather, setWeather ] = useState({})
  const api_key = process.env.REACT_APP_API_KEY
  const handleShowButtonClick = (event) => {
    const ctry = shownCountries[event.target.value]
    setShownCountries([ctry])
    const city = ctry.capital
    const addr = `http://api.weatherstack.com/current?access_key=${api_key}&query='${city}'`
    axios
    .get(addr)
    .then(response => {
      setWeather(response.data)
      console.log(response.data)
    })
  }
    

  const handleFilterChange = event => {
    const fs = event.target.value.toLowerCase()
    setFilterString(fs)
    setShownCountries(countries.filter(country => country.name.toLowerCase().includes(fs)))
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
    }, [])

  return (
    <div><h2>Browse restcountries.eu data</h2>
      find countries 
      <input value=    {filterString} 
          onChange=    {handleFilterChange}/>
      <PageMainComponent  shownCountries={shownCountries} 
                          handleClick={handleShowButtonClick}/>

      {(JSON.stringify(weather)==='{}') ? '' :  <><h3>Weather in {weather.location.name}:</h3>
                                                <h4>Temperature: {weather.current.temperature} celsius</h4>
                                                <img src={weather.current.weather_icons[0]} alt="weather" ></img>
                                                <h4>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</h4></>}
                                                
    </div>
  );
}

export default App;
