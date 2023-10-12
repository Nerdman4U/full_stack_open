import { useState, useEffect } from 'react'
import axios from 'axios'

import SearchForm from './components/SearchForm'
import CountryList from './components/CountryList'
import Country from './components/Country'

import './App.css'

const Content = ({countries}) => {
  if (!countries) countries = []
  let result = ""
  if (countries.length < 1) {
    result = <h1>Ei hakutuloksia</h1>
  }
  else if (countries.length === 1) {
    result = <Country country={countries[0]}/>
  }
  else {
    result = <CountryList countries={countries}/>
  }
  return <div className="content">{result}</div>
}

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/"
const _get = (name) => {
  const items = (name) ? [baseUrl,'api','name',name] : [baseUrl,'api','all']
  return axios.get(items.join("/"))
       .then((response) => {
          //console.log("_get() response:", response)
          return response.data
       })
}

function App() {
  const [countries, setCountries] = useState([])
  const [newSearch, setSearch] = useState("")
  const [visibleCountries, setVisibleCountries] = useState([])

  const handleSearchChange = (event) => {
    const value = event.target.value
    const regexp = new RegExp(value, "i")
    const visible = countries.filter(country => {
      return country.name.common.match(regexp)
    })
    console.log("handleSearchChange() visible:", visible)
    //if (visible.length > 0) console.log(visible[0])
    setVisibleCountries(visible)
    setSearch(value)
  }

  useEffect(() => {
    _get().then((result) => {
      console.log("useEffect() result:", result)
      setCountries(result)
    })
  }, [])

  console.log("App() visible:", visibleCountries)

  return (
    <>
      <SearchForm value={newSearch} handleSearchChange={handleSearchChange}/>
      <Content countries={visibleCountries}/>
    </>
  )
}

export default App
