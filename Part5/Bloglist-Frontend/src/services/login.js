import axios from 'axios'

const login = async (credentials) => {
  const baseUrl = 'http://localhost:3000/api/login'

  const response = await axios.post(baseUrl, credentials)
  return response.data
}
export default login
