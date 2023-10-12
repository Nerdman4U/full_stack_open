import CountryList from './CountryList'
import Country from './Country'

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

export default Content