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

// Data: päivitetty objekti.
const _put = (id, modifiedObject) => {
    return axios
        .put(`${baseUrl}/${id}`, modifiedObject)
        .then(response => {
            return response.data
        })
 }

const _delete = (id) => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .then(response => { return response.data })
}

export default { _get, _post, _put, _delete }