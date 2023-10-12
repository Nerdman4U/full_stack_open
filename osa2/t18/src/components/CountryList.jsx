const CountryItem = ({cca2, country}) => {
    return <>
        <li key={cca2}>{country.name.common} ({country.region}, {country.subregion})</li>
    </>
}

const CountryList = ({countries}) => {
    console.log("CountryList countries.length:", countries.length)
    if (countries.length > 10) {
        return (
        <div>
          {`Täsmennä hakua! Tuloksia tulee olla alle 10. Tuloksia nyt: ${countries.length}`}
        </div>)
    } 

    const result = countries.map(country => { return <CountryItem key={country.cca2} country={country}/> })
    return (<ul>{result}</ul>)
}

export default CountryList
