
const axios = require('axios')
const jwt = require('jsonwebtoken')

const Dev = require('../models/Dev')

const { GET_USER_URL } = require('../constants')
const { AUTH_TOKEN_TTL } = require('../env')
const { secret } = require('../../config')

function generateBase64Token ({ id, githubUsername, name, bio }) {
  const token = jwt.sign({
    sub: id,
    context: {
      github_username: githubUsername,
      name,
      bio
    }
  }, secret, { expiresIn: AUTH_TOKEN_TTL })

  return Buffer.from(token).toString('base64')
}

module.exports = {
  async index (req, res) {
    try {
      const githubToken = req.body.github_token

      const response = await axios.get(GET_USER_URL, {
        headers: {
          Authorization: `token ${githubToken}`
        }
      })

      const { data } = response
      const { login: githubUsername, name, bio, avatar_url: avatarUrl } = data

      let existingUser = await Dev.findByUsername(githubUsername)
      if (!existingUser) {
        existingUser = await Dev.create({
          github_username: githubUsername,
          name,
          bio,
          avatar_url: avatarUrl
        })
      }

      const token = generateBase64Token({
        id: existingUser._id,
        githubUsername,
        name,
        bio
      })

      return res.json({ token, username: githubUsername })
    } catch (error) {
      console.log(error)
    }
  }
}
