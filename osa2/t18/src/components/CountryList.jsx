const CountryItem = ({cca2, country, handlers}) => {
    return <>
        <li key={cca2}>{country.name.common} ({country.region}, {country.subregion}) <button value={country.name.common} onClick={handlers["show"]}>Show</button></li>
    </>
}

const CountryList = ({countries, handlers}) => {
    console.log("CountryList countries.length:", countries.length)
    if (countries.length > 10) {
        return (
        <div>
          {`Täsmennä hakua! Tuloksia tulee olla alle 10. Tuloksia nyt: ${countries.length}`}
        </div>)
    } 

    const result = countries.map(country => { return <CountryItem key={country.cca2} country={country} handlers={handlers}/> })
    return (<ul>{result}</ul>)
}

export default CountryList
