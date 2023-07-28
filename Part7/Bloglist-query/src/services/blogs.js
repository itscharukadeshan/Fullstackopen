import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/blogs'

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}
const getOne = async (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  const response = await request
  return response.data
}
const create = async (newObject, token) => {
  const config = {
    headers: { Authorization: token },
  }
  try {
    const response = await axios.post(baseUrl, newObject, config)

    return response.data
  } catch (error) {
    throw new Error(`problem with Reaching api : ` + error.message)
  }
}

const update = async (id, newObject, token) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}
const updateLikes = async (id, newObject, token, operation) => {
  const config = {
    headers: { Authorization: token },
    params: { operation },
  }

  const response = await axios.put(`${baseUrl}/${id}/likes`, newObject, config)
  return response.data
}

const remove = async (id, token) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}
const addComment = async (id, text) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { text })

  return response.data
}

const blogService = {
  getAll,
  create,
  update,
  remove,
  updateLikes,
  getOne,
  addComment,
}
export default blogService
