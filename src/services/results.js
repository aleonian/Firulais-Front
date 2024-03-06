import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BACKEND + "/results"

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(baseUrl, config);

  return request.then(response => response.data);
}

const erase = (data) => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.delete(`${baseUrl}/${data.id}`, config);

}
const eraseAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.get(`${baseUrl}/erase/all`, config);
}

export default { getAll, setToken, erase,eraseAll }