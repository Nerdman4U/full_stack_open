const Country = ({country}) => {
    let image,
        flag_url = ""
    const flag_ids = Object.keys(country.flags)

    if (flag_ids.length > 0) {
        flag_url = (flag_ids.find(_id => _id === "svg")) ? country.flags["svg"] : country.flags[flag_ids[0]]
        image = <img src={flag_url} width="200px"/>
    }
    
    return <>
        <h1>{country.name.common}</h1>
        <table>
            <tbody>
                <tr><td>Capital</td><td>{country.capital}</td></tr>
                <tr><td>Area</td><td>{country.area}</td></tr>
            </tbody>
        </table>
        <b>Languages:</b>
        <ul>
        {Object.keys(country.languages).map(language => {
            return <li key={language}>{country.languages[language]}</li>
        })}
        </ul>

        { image }
    </>
}

export default Country