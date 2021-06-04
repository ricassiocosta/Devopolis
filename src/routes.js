const { Router } = require('express')
const { query } = require('express-validator')

const { checkToken, verifyJWT } = require('./middlewares/auth')
const { checkValidation } = require('./middlewares/base-middleware')

const CallbackController = require('./controllers/CallbackController')
const AuthController = require('./controllers/AuthController')
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')
const PostController = require('./controllers/PostController')
const DashboardController = require('./controllers/DashboardController')

const routes = Router()

routes.get('/callback/github', CallbackController.github)
routes.post('/auth', AuthController.index)

routes.use([checkToken, verifyJWT])

routes.post('/devs', DevController.store) // Create a Dev
routes.get('/devs', DevController.index) // Shows all Devs created
routes.get('/devs/:username', DevController.show) // Show a single Dev using username
routes.get('/devs/:username/liked_posts', DevController.likedPosts) // gets all liked dev posts
routes.get('/devs/:username/repos', DevController.getRepositories) // gets all dev repositories
routes.get('/devs/posts/:devId', DevController.findById) // Show a single Dev using id
routes.post('/devs/:username/follow', DevController.follow) // Follow a Dev
routes.delete('/devs/:username/unfollow', DevController.unfollow) // Unfollow a Dev

routes.get('/search', [
  query('search_query')
    .isLength({ min: 3 })
    .withMessage('The search query string should be at least 3'),
  query('search_by')
    .optional(),
  checkValidation
], SearchController.index) // Search Devs

routes.post('/posts', PostController.store) // Create posts
routes.get('/posts/:username', PostController.index) // Shows all dev's posts
routes.get('/posts/:username/:post_id', PostController.show) // Shows a specific post from a dev
routes.post('/posts/:username/:post_id/like', PostController.like) // like a post
routes.delete('/posts/:username/:post_id/dislike', PostController.dislike) // dislike a post

routes.get('/dashboard', DashboardController.index) // Show all followed dev's posts

routes.get('/validate_token', (req, res) => {
  return res.json('token is valid')
})

module.exports = routes
