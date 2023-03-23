const router = require('express').Router()
const {
  getTagGroupsList,
  getTagGroupsById,
  createTagGroup,
  updateTagGroup,
  removeTagGroup
} = require('../controllers/tagGroups')
router.get('/', async (request, response) => {
  try {
    const project = await getTagGroupsList()
    response.status(200).json(project)
  } catch (error) {
    response.status(500)
  }
})
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const project = await getTagGroupsById(id)
    response.status(200).json(project)
  } catch (error) {
    response.status(500).json(error)
  }
})

router.post('/', async (request, response) => {
  try {
    const data = request.body
    const project = await createTagGroup(data)
    response.status(200).json(project)
  } catch (error) {
    response.status(500).json(error.message)
  }
})

router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const data = request.body
    console.log({ id, data })
    const project = await updateTagGroup(id, data)
    response.status(200).json(project)
  } catch (error) {
    response.status(500)
  }
})
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params
    await removeTagGroup(id)
    response.status(200).json(true)
  } catch (error) {
    response.status(500)
  }
})




module.exports = router
