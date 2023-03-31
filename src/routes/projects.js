const router = require('express').Router()
const {
  getProjectsList,
  getProjectsById,
  createProject,
  removeProject,
  getProjectsGeneral,
} = require('../controllers/projects')
const {
  eightTopProject,
  eightLatestProject,
} = require('../controllers/landing')

router.get('/', async (request, response) => {
  try {
    console.log(request.user.id)
    const { goal, returnInvestment } = request.body
    const project = await getProjectsList({ goal, returnInvestment })
    response.status(200).json(project)
  } catch (error) {
    response.status(500)
  }
})

router.get('/dashboard-investor', async (request, response) => {
  try {
    console.log('hola')
    let allData = {}
    const eightTop = await eightTopProject()
    const eightLatest = await eightLatestProject()

    allData = {
      topProjects: eightTop,
      closeSoonProjects: eightLatest,
      latestProjects: eightLatest,
    }
    response.status(200).json(allData)
  } catch (error) {
    response
      .status(500)
      .json('Error at getting data for dashboard: ' + error.message)
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
    const entrepreneurId = request.user.id
    const project = await createProject(data, request.user)
    response.status(200).json(project)
  } catch (error) {
    response.status(500).json(error.message)
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
