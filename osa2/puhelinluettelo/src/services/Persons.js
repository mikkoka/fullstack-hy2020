import axios from 'axios'

const url = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}
const create = (newPerson) => {
    const request = axios.post(url, newPerson)
    return request.then(response => response.data)
}

const deletePerson = (personKey) => {
    const request = axios.delete(`${url}/${personKey}`)
    return request.then(response => response.data)
}

const updatePerson = (updatedPerson, id) => {
    const request = axios.put(`${url}/${id}`, updatedPerson)
    return request.then(response => response.data)
}

const e = {  getAll, create, deletePerson, updatePerson }

export default e
  