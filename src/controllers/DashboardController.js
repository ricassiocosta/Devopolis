const Post = require('../models/Post')
const Dev = require('../models/Dev')

module.exports = {
  async index (req, res) {
    try {
      const { id: devId } = res.locals.user

      const dev = await Dev.findOne({ _id: devId })
      const dashboardParticipants = dev.followedList
      const posts = await Post.find({
        author: {
          $in: dashboardParticipants
        }
      })

      const newPostsPromise = posts.map(async (post) => {
        const author = await Dev.findById(post.author)
        return {
          ...post._doc,
          author: author.github_username,
          authorPhoto: author.avatar_url
        }
      })

      const newPosts = await Promise.all(newPostsPromise)

      return res.json({ posts: newPosts })
    } catch (error) {
      console.log(error)
    }
  }
}
