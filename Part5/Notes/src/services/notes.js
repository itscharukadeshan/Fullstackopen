import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/notes'
let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    handleRequestError(error)
  }
}

const create = async (newObject) => {
  try {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch (error) {
    handleRequestError(error)
  }
}

const update = async (id, newObject) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
  } catch (error) {
    handleRequestError(error)
  }
}

const handleRequestError = (error) => {
  if (error.response) {
    console.error('Request failed with response:', error.response.data)
  } else if (error.request) {
    console.error('No response received:', error.request)
  } else {
    console.error('Error during request setup:', error.message)
  }
  throw error
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    handleRequestError(error)
    return Promise.reject(error)
  }
)

export default { getAll, create, update, setToken }
