const axios = require('axios')
const Dev = require('../models/Dev')

module.exports = {
  async index (req, res) {
    try {
      const devs = await Dev.find()
      return res.json(devs)
    } catch (error) {
      console.log(error)
    }
  },
  async show (req, res) {
    try {
      const { username } = req.params
      const dev = await Dev.findByUsername(username)
      return res.json(dev)
    } catch (error) {
      console.log(error)
    }
  },
  async store (req, res) {
    try {
      const { github_username: githubUsername, techs } = req.body

      let dev = await Dev.findByUsername(githubUsername)

      if (!dev) {
        const response = await axios.get(`https://api.github.com/users/${githubUsername}`)
        const { name, avatar_url: avatarUrl, bio } = response.data

        dev = await Dev.create({
          github_username: githubUsername,
          name,
          avatar_url: avatarUrl,
          bio,
          techs
        })
      }

      return res.json(dev)
    } catch (error) {
      console.log(error)
    }
  },
  async follow (req, res) {
    try {
      const { username } = req.params
      const { id: devId } = res.locals.user

      const dev = await Dev.findOne({ _id: devId })
      const devToFollow = await Dev.findByUsername(username)

      if (devToFollow && !dev.followedList.includes(devToFollow._id)) {
        dev.followedList.push(devToFollow._id)
        await dev.save()
      }
      return res.json(dev)
    } catch (error) {
      console.log(error)
    }
  },
  async unfollow (req, res) {
    try {
      const { username } = req.params
      const { id: devId } = res.locals.user

      const dev = await Dev.findOne({ _id: devId })
      const devToUnfollow = await Dev.findByUsername(username)

      if (devToUnfollow && dev.followedList.includes(devToUnfollow._id)) {
        dev.followedList.splice(dev.followedList.indexOf(devToUnfollow._id), 1)
        await dev.save()
      }
      return res.json(dev)
    } catch (error) {
      console.log(error)
    }
  },
  async findById (req, res) {
    try {
      const { id: devId } = res.locals.user
      const dev = await Dev.findOne({ _id: devId })
      return res.json(dev)
    } catch (error) {
      console.log(error)
    }
  },
  async likedPosts (req, res) {
    try {
      const { id: devId } = res.locals.user
      const dev = await Dev.findOne({ _id: devId })
      return res.json(dev.likedPosts)
    } catch (error) {
      console.log(error)
    }
  }
}
