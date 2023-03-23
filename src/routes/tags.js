const router = require('express').Router()
const {
    getTagsList,
    getTagsById,
    createTag,
    updateTag,
    removeTag,
} = require('../controllers/tags')
router.get('/', async (request, response) => {
  try {
    const project = await getTagsList()
    response.status(200).json(project)
  } catch (error) {
    response.status(500)
  }
})
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const project = await getTagsById(id)
    response.status(200).json(project)
  } catch (error) {
    response.status(500).json(error)
  }
})

router.post('/', async (request, response) => {
  try {
    const data = request.body
    const project = await createTag(data)
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
    const project = await updateTag(id, data)
    response.status(200).json(project)
  } catch (error) {
    response.status(500)
  }
})
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params
    await removeTag(id)
    response.status(200).json(true)
  } catch (error) {
    response.status(500)
  }
})

module.exports = router