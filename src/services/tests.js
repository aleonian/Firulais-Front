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

const get = (testId) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(`${baseUrl}/${testId}`, config);

  return request.then(response => response.data);
}
const getActive = () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(`${baseUrl}/active`, config);

  return request.then(response => response.data);
}

const create = (data) => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.post(baseUrl + "/add", data, config);
}

const enqueue = (data) => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.post(`${baseUrl}/enqueue`, data, config);
}

const erase = (data) => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.delete(`${baseUrl}/${data.id}`, config);

}

const update = (data) => {
  console.log("update->", data);
  const config = {
    headers: { Authorization: token },
  }
  return axios.put(`${baseUrl}/${data.id}`, data, config);
}

const runAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.get(`${baseUrl}/enqueue/all`, config);
}

export default { getAll, setToken, create, erase, update, enqueue, runAll, get, getActive }