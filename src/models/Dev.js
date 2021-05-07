const mongoose = require('mongoose')

const DevSchema = new mongoose.Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [String],
  posts: Number,
  collab_Project: Number,
  followedList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dev'
  }],
  likedPosts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }]
})

DevSchema.statics.findByUsername = function (username) {
  return this.findOne({ github_username: username })
}

module.exports = mongoose.model('Dev', DevSchema)
