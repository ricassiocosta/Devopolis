const Post = require('../models/Post')
const Dev = require('../models/Dev')

module.exports = {
  async store (req, res) {
    const { buffer } = req.file
    const { title, post } = req.body
    const { id: devId } = res.locals.user

    const dev = await Dev.findById(devId)
    if (!dev) {
      return res.status(400).json({
        error: 'user does not exist'
      })
    }

    const publication = await Post.create({
      author: devId,
      thumbnail: Buffer.from(buffer).toString('base64'),
      title,
      post
    })

    return res.json(publication)
  },
  async index (req, res) {
    const { username } = req.params

    const dev = await Dev.findByUsername(username)

    const posts = await Post.find({
      author: dev._id
    })

    return res.json(posts)
  },
  async show (req, res) {
    const { username, post_id: postId } = req.params

    const dev = await Dev.findByUsername(username)

    const posts = await Post.find({
      _id: postId,
      author: dev._id
    })

    return res.json(posts)
  }
}
