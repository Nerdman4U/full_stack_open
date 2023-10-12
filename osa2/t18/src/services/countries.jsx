import axios from 'axios'

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/"
const _get = (name) => {
  const items = (name) ? [baseUrl,'api','name',name] : [baseUrl,'api','all']
    return axios.get(items.join("/"))
       .then((response) => {
          //console.log("_get() response:", response)
          return response.data
       })
}

export default { _get }