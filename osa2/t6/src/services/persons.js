import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const _get = () => {   
    return axios
        .get(baseUrl)
        .then((response) => {
            return response.data
        })

}

const _post = newObject => {
    return axios
        .post(baseUrl, newObject)
        .then(response => {
            return response.data
        })
}

const _put = (id,newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { _get, _post, _put }