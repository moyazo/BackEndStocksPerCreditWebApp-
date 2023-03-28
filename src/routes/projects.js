const router = require('express').Router()
const {
  getProjectsList,
  getProjectsById,
  createProject,
  updateProject,
  removeProject,
} = require('../controllers/projects')
const { eightTopProject, eightLatestProject } = require('../controllers/landing')

router.get('/', async (request, response) => {
  try {
    const {goal, returnInvestment} = request.body;
    const project = await getProjectsList({goal, returnInvestment});
    response.status(200).json(project);
  } catch (error) {
    response.status(500)
  }
})
router.get('/dashboard-investor', async (request, response) => {
  try {
    let allData = {};
    const eightTop = await eightTopProject();
    const eightLatest = await eightLatestProject();
    const allProjects = await getProjectsList({goal: 0, returnInvestment: ''});
    if(!allProjects && !eightLatest && !eightTop){
      allData = {
        topProjects: 'No hay datos suficientes',
        closeSoonProjects: 'No hay datos suficientes',
        latestProjects: 'No hay datos suficientes',
        allProjects: 'No hay datos suficientes'
      }
    }else{
      allData = {
        topProjects: eightTop,
        closeSoonProjects: eightLatest.slice(0,8),
        latestProjects: eightLatest.slice(-8),
        allProjects
      } 
    }
    response.status(200).json(allData);
  } catch (error) {
    response.status(500).json('Error at getting data for dashboard: ' + error.message);
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
    const project = await createProject(data, request.user)
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
