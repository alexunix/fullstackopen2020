import React, { useEffect, useState} from "react";
import axios from 'axios';

const Filter = ({value, onChange}) => {
  return (
    <>
    <input value={value} onChange={onChange} />
    </>
  )
}

const Weather = ({country}) => {

  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country}`)
    .then(response => setWeather(response.data.current) && console.log(response.data))
  },[])
  
  return (
    (weather.temperature)
      ?
      <div>
      <strong>temperature: </strong>{weather.temperature}℃<br /> 
      <img src={weather.weather_icons[0]} /> <br />
      <strong>wind: </strong>{weather.wind_speed} mph, direction {weather.wind_dir}
      </div>
      : ''
    )
}

const Country = ({country}) => {
  return (
  <div>
    <h2>{country.name}</h2>
    <p>Capital: {country.capital}</p>
    <p>Population: {country.population}</p>
    <h3>languages</h3>
    <ul> 
      {country.languages.map(l=><li key={l.name}>{l.name}</li>)}
    </ul>
    <img src={country.flag} />
    <Weather country={country.name} />
  </div>
  )
}

const Countries = ({data, filter, showCountyHandler}) => {
  if (filter === '') return ''
  const filtered = data.filter(c=>c.name.toLowerCase().includes(filter.toLowerCase()))
  if (filtered.length === 0) return <p>Sorry, nothing was found.</p>
  else if (filtered.length > 1) return (
    <>
      {filtered.map(c=><p key={c.name}>{c.name}<button onClick={showCountyHandler(c.name)}>show</button></p>)}
    </>
  )
  return <Country country={filtered[0]} />
}


export default () => {

  const [filterValue, setFilterValue] = useState('')
  const [countries, setCoutries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCoutries(response.data)
    })
  },[])

  const filterHandler = (event) => {
    const value = event.target.value
    setFilterValue(value)
  }

  const showCountyHandler = (name) => () => {
    setFilterValue(name)
  }

  return (
    <>
    <h1>Countries finder</h1>
    <p>Hard to get more minimal than this React app.</p>
    <Filter onChange={filterHandler} value={filterValue} />
    <Countries data={countries} filter={filterValue} showCountyHandler={showCountyHandler} />
    </>
  );
}
