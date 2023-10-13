const Weather = ({weather}) => {
  if (Object.keys(weather).length < 1) return
  //console.log("weather:", weather)
  return <div>
    <b>Weather</b>
    <table>
        <tbody>
            <tr><td>Temperature:</td><td>{weather["current"]["temperature_2m"]} {weather["current_units"]["temperature_2m"]}</td></tr>
            <tr><td>Wind speed:</td><td>{weather["current"]["windspeed_10m"]} {weather["current_units"]["windspeed_10m"]}</td></tr>
        </tbody>
    </table>
  </div>
}

const Country = ({country, handlers, weather}) => {
    let image,
        flag_url = ""
    const flag_ids = (country.flags) ? Object.keys(country.flags) : []
    const currencies = (country.currencies) ? Object.values(country.currencies).map(cur => cur.name) : []

    if (flag_ids.length > 0) {
        flag_url = (flag_ids.find(_id => _id === "svg")) ? country.flags["svg"] : country.flags[flag_ids[0]]
        image = <img src={flag_url} width="200px"/>
    }
    
    return <>
        <h1>{country.name.common}</h1>
        <p>
            { image }
        </p>

        <div>
          <table>
            <tbody>
                <tr><td>Continents:</td><td>{country.continents.join(", ")}</td></tr>
                <tr><td>Capital:</td><td>{country.capital}</td></tr>
                <tr><td>Area:</td><td>{country.area}</td></tr>
                <tr><td>Currencies:</td><td>{currencies.join(", ")}</td></tr>
                <tr><td>Independent:</td><td>{(country.independent) ? "Yes" : "No"}</td></tr>
                <tr><td>Population:</td><td>{country.population}</td></tr>
                <tr><td>Start of the week:</td><td>{country.startOfWeek}</td></tr>
                <tr><td>Timezones:</td><td>{country.timezones.join(", ")}</td></tr>
            </tbody>
          </table>
        </div>

        <div>
          <b>Languages:</b>
            <ul>
              {Object.keys(country.languages).map(language => {
              return <li key={language}>{country.languages[language]}</li>
              })}
            </ul>
        </div>

        <Weather weather={weather}/>

        <div><button onClick={handlers["back"]}>Back</button></div>

    </>
}

export default Country