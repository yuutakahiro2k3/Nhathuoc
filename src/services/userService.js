import axios from "../axios";

const handleLoginAPI = (userEmail, userPassword) => {
    return axios.post('http://localhost:8080/api/login', { email: userEmail, password: userPassword });
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
const createNewService = (data) => {
    console.log('check data', data)
    return axios.post('/api/create-new-user', data)
}
export { handleLoginAPI, getAllUsers, createNewService }
