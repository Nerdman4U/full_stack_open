import { useState, useEffect } from 'react'
import axios from 'axios'

// Components
import SearchForm from './components/SearchForm'
import Content from './components/Content'
import Weather from './components/Weather'

// Service
import countryService from './services/countries'

// CSS
import './App.css'

// => Unauthorized
// const ow_api_key = import.meta.env.VITE_OW

/*
  App()

  Weather data is fetched when filter result is exactly 1 and
  when show country button is clicked.

*/

function App() {
  const [countries, setCountries] = useState([])
  const [newSearch, setSearch] = useState("")
  const [visibleCountries, setVisibleCountries] = useState([])
  const [newWeather, setWeather] = useState({})

  const filterCountries = (value) => {
    const regexp = new RegExp(value, "i")
    return countries.filter(country => {
      return country.name.common.match(regexp)
    })
  }

  const getWeather = (lat,lon) => {
    //const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${ow_api_key}`
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,windspeed_10m&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
    axios.get(url)
      .then(result => {
        setWeather(result.data)
      })
  }

  const handleSearchChange = (event) => {
    const value = event.target.value
    const visible = filterCountries(value)
    //console.log("handleSearchChange() visible:", visible)

    setSearch(value)
    setVisibleCountries(visible)

    if (visible.length === 1) {
      //getWeather(visible[0].latlng[0],visible[0].latlng[1])
    }
    else {
      setWeather({})
     }   
  }

  const handleShowButton = (event) => {
    countryService._get(event.target.value)
      .then(data => {
        //console.log("data", data)
        setVisibleCountries([].concat(data))
        getWeather(data.latlng[0],data.latlng[1])
      })
  }

  const handleBackButton = (event) => {
    let filtered = filterCountries(newSearch)
    if (filtered.length < 2) {
      filtered = countries.slice()
      setSearch("")
    }
    setVisibleCountries(filtered)
    setWeather({})
    document.getElementById('searchForm').focus()
  }

  useEffect(() => {
    countryService._get().then((result) => {
      setCountries(result)
    })
  }, [])

  const handlers = {
    search: handleSearchChange,
    show: handleShowButton,
    back: handleBackButton
  }

  return (
    <>
      <SearchForm value={newSearch} handlers={handlers}/>
      <Content countries={visibleCountries} handlers={handlers} newSearch={newSearch} newWeather={newWeather}/>
    </>
  )
}

export default App
