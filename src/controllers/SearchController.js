const searchApplication = require('../application/search.application')

module.exports = {
  async index (req, res) {
    try {
      const { search_by: searchBy, search_query: searchQuery } = req.query
      const devs = await searchApplication.execute(searchBy, searchQuery)
      return res.json({ devs })
    } catch (err) {
      return res.sendStatus(500)
    }
  }
}
