import { useState, useEffect } from 'react'

import SearchForm from './components/SearchForm'
import Content from './components/Content'
import countryService from './services/countries'

import './App.css'

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
    countryService._get(event.target.value)
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
      <Content countries={visibleCountries} handlers={handlers} newSearch={newSearch}/>
    </>
  )
}

export default App
