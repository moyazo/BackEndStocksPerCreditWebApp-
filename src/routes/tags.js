const router = require('express').Router()
const { getTagsList, toggleTagTagGroup } = require('../controllers/tags')

router.get('/', async (request, response) => {
  try {
    const tags = await getTagsList()
    if (!tags) {
      response.status(502).json('tags not given from our controller')
    }
    response.status(200).json(tags)
  } catch (error) {
    response.status(500).json('Error at get tags route: ' + error.message)
  }
})

module.exports = router
