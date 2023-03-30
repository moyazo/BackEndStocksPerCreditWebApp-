const router = require('express').Router()
const {
  getProjectsList,
  getProjectsById,
  createProject,
  removeProject,
  getProjectsGeneral
} = require('../controllers/projects')
const {
  eightTopProject,
  eightLatestProject,
} = require('../controllers/landing')

// TODO NONO MOLINA. ESTAS RUTAS SOLO PARA ENTREPRENEUR

router.get('/', async (request, response) => {
  try {
    const { goal, returnInvestment } = request.body
    const project = await getProjectsList({ goal, returnInvestment })
    response.status(200).json(project)
  } catch (error) {
    response.status(500)
  }
})
router.get('/dashboard-investor', async (request, response) => {
  try {
    let allData = {}
    const eightTop = await eightTopProject();
    const eightLatest = await eightLatestProject();
    console.log('hi')
    const allProjects = await getProjectsGeneral();
    console.log('hi')
    if (!allProjects && !eightLatest && !eightTop) {
      allData = {
        topProjects: 'No hay datos suficientes',
        closeSoonProjects: 'No hay datos suficientes',
        latestProjects: 'No hay datos suficientes',
        allProjects: 'No hay datos suficientes',
      }
    } else {
      allData = {
        topProjects: eightTop,
        closeSoonProjects: eightLatest.slice(0, 8),
        latestProjects: eightLatest.slice(-8),
        allProjects,
      }
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
    const data = request.body;
    const entrepreneurId = request.user.id;
    const project = await createProject(data, request.user);
    response.status(200).json(project);
  } catch (error) {
    response.status(500).json(error.message);
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
