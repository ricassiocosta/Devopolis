const Post = require('../models/Post')
const Dev = require('../models/Dev')

module.exports = {
  async store (req, res) {
    try {
      const { thumbnail, post, title } = req.body
      const { id: devId } = res.locals.user

      const dev = await Dev.findById(devId)
      if (!dev) {
        return res.status(400).json({
          error: 'user does not exist'
        })
      }

      const publication = await Post.create({
        author: devId,
        thumbnail,
        title,
        post
      })

      return res.json(publication)
    } catch (error) {
      console.log(error)
    }
  },
  async index (req, res) {
    try {
      const { username } = req.params

      const dev = await Dev.findByUsername(username)

      const posts = await Post.find({
        author: dev._id
      })

      return res.json(posts)
    } catch (error) {
      console.log(error)
    }
  },
  async show (req, res) {
    try {
      const { username, post_id: postId } = req.params

      const dev = await Dev.findByUsername(username)

      const posts = await Post.find({
        _id: postId,
        author: dev._id
      })

      return res.json(posts)
    } catch (error) {
      console.log(error)
    }
  },
  async like (req, res) {
    try {
      const { username, post_id: postId } = req.params

      const dev = await Dev.findByUsername(username)

      if (dev && !dev.likedPosts.includes(postId)) {
        dev.likedPosts.push(postId)
        await dev.save()
      }
      return res.json(dev.likedPosts)
    } catch (error) {
      console.log(error)
    }
  },
  async dislike (req, res) {
    try {
      const { username, post_id: postId } = req.params

      const dev = await Dev.findByUsername(username)

      if (dev && dev.likedPosts.includes(postId)) {
        dev.likedPosts.splice(dev.likedPosts.indexOf(postId), 1)
        await dev.save()
      }
      return res.json(dev.likedPosts)
    } catch (error) {
      console.log(error)
    }
  }
}
