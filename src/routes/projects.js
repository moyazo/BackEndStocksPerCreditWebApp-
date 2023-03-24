const router = require('express').Router()
const {
  getProjectsList,
  getProjectsById,
  createProject,
  updateProject,
  removeProject,
  latestProject,
  topProject,
  totalAmountProject,
  ratioSuccessProject,
} = require('../controllers/projects')

router.get('/', async (request, response) => {
  try {
    const {filters} = request.body
    const project = await getProjectsList(filters)
    response.status(200).json(project)
  } catch (error) {
    response.status(500)
  }
})

router.get('/latest', async (request, response) => {
  try {
    const project = await latestProject()
    response.status(200).json(project)
  } catch (error) {
    response.status(500)
  }
})

router.get('/top-project', async (request, response) => {
  try {
    const project = await topProject()
    response.status(200).json(project)
  } catch (error) {
    response.status(500)
  }
})

router.get('/success', async (request, response) => {
  try {
    const project = await ratioSuccessProject()
    response.status(200).json(project)
  } catch (error) {
    response.status(500)
  }
})

router.get('/totalamount', async (request, response) => {
  try {
    const project = await totalAmountProject()
    response.status(200).json(project)
  } catch (error) {
    response.status(500)
  }
})

router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const project = await getProjectsById(id)
    response.status(200).json(project)
  } catch (error) {
    response.status(500).json(error)
  }
})

router.post('/', async (request, response) => {
  try {
    const data = request.body
    const project = await createProject(data)
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
    const project = await updateProject(id, data)
    response.status(200).json(project)
  } catch (error) {
    response.status(500)
  }
})
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params
    await removeProject(id)
    response.status(200).json(true)
  } catch (error) {
    response.status(500)
  }
})

module.exports = router
