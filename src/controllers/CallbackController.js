
const axios = require('axios')

const { GET_ACCESS_TOKEN_URL } = require('../constants')
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = require('../env')

module.exports = {
  async github (req, res) {
    try {
      const requestToken = req.query.code
      const url = GET_ACCESS_TOKEN_URL
        .replace('{id}', GITHUB_CLIENT_ID)
        .replace('{secret}', GITHUB_CLIENT_SECRET)
        .replace('{code}', requestToken)

      const response = await axios.get(url)
      const match = response.data.match(/access_token=(.*)&scope/)

      if (match) {
        const [, token] = match
        return res.json({ token })
      }
    } catch (error) {
      console.log(error)
    }
  }
}
