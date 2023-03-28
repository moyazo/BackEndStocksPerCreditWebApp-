const router = require('express').Router()
const {
  getProjectsList,
  getProjectsById,
  createProject,
  updateProject,
  removeProject,
} = require('../controllers/projects')

router.get('/', async (request, response) => {
  try {
    const {goal, returnInvestment} = request.body;
    const project = await getProjectsList({goal, returnInvestment});
    response.status(200).json(project);
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
    const tagId = data.tagId;
    const project = await createProject(data,tagId)
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
