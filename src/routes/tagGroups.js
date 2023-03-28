const router = require('express').Router()
const { getTagGroupsList } = require('../controllers/tagGroups')

/**
 * *Tag groups END-POINT*
 * *localhost:8000/tagGroups*
 * *This end-point give a JSON with all the tags groups in our DB using /controllers/tagGroups.js*
 * @param {Request} request
 * @param {Response} response
 * @returns {JSON}
 */
router.get('/', async (request, response) => {
  try {
    const TagGroups = await getTagGroupsList()
    if (!TagGroups) {
      response.status(502).json('TagGroups not given from controller')
    }
    response.status(200).json(TagGroups)
  } catch (error) {
    response
      .status(500)
      .json('Error at get TagGroups list route: ' + error.message)
  }
})

module.exports = router
