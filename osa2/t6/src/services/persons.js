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

const _delete = (id) => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .then(response => { return response.data })
        .catch(error => {
            console.log("Cannot find id, error:", error.data)
        })
}

export default { _get, _post, _put, _delete }