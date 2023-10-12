import { useState, useEffect } from 'react'
import axios from 'axios'

import SearchForm from './components/SearchForm'
import CountryList from './components/CountryList'
import Country from './components/Country'

import './App.css'

const Content = ({countries, handlers, newSearch}) => {
  if (!countries) countries = []
  let result = ""
  if (countries.length < 1 || !newSearch) {
    result = <h1>Ei hakutuloksia</h1>
  }
  else if (countries.length === 1) {
    result = <Country country={countries[0]} handlers={handlers}/>
  }
  else {
    result = <CountryList countries={countries} handlers={handlers}/>
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

  const filterCountries = (value) => {
    const regexp = new RegExp(value, "i")
    return countries.filter(country => {
      return country.name.common.match(regexp)
    })
  }

  const handleSearchChange = (event) => {
    const value = event.target.value
    const visible = filterCountries(value)
    //console.log("handleSearchChange() visible:", visible)
    //if (visible.length > 0) console.log(visible[0])
    setVisibleCountries(visible)
    setSearch(value)
  }

  const handleShowButton = (event) => {
    _get(event.target.value)
      .then(data => {
        console.log(data)
        setVisibleCountries([].concat(data))
      })
  }

  const handleBackButton = (event) => {
    let filtered = filterCountries(newSearch)
    if (filtered.length < 2) {
      filtered = countries.slice()
      setSearch("")
    }
    setVisibleCountries(filtered)
    document.getElementById('searchForm').focus()
  }

  useEffect(() => {
    _get().then((result) => {
      console.log("useEffect() result:", result)
      setCountries(result)
    })
  }, [])

  console.log("App() visible:", visibleCountries)

  const handlers = {
    search: handleSearchChange,
    show: handleShowButton,
    back: handleBackButton
  }

  return (
    <>
      <SearchForm value={newSearch} handlers={handlers}/>
      <Content countries={visibleCountries} handlers={handlers} newSearch={newSearch}/>
    </>
  )
}

export default App
