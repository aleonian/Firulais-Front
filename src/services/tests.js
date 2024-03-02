import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BACKEND + "/tests"

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

const create = (data) => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.post(baseUrl, data, config);
}
export default { getAll, setToken, create }