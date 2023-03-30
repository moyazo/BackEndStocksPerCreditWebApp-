const router = require('express').Router()
const {
  latestProject,
  topProject,
  totalAmountProject,
  ratioSuccessProject,
} = require('../controllers/landing')
const { getProjectsGeneral } = require('../controllers/projects')
/**
 * *ALL DATA IN ORDER TO SHOW IT AT LANDING PAGE ON FRONT-END*
 * *localhost:8000/landing*
 * @param {Request} req
 * @param {Response} res
 * @returns {JSON} 
 */
router.get('/', async (req, res) => {
  try {
    const totalProjects = await getProjectsGeneral()
    const latestProjects = await latestProject()
    const topProjects = await topProject()
    const totalAmount = await totalAmountProject()
    const ratioSuccess = await ratioSuccessProject()

    res.status(200).json({
      latestProjects,
      topProjects,
      totalAmount,
      ratioSuccess,
      totalProjects: totalProjects ? totalProjects.length : 0,
    })
  } catch (error) {
    console.log('Error at landing route: ' + error.message)
    res.status(500).json(error.message)
  }
})

module.exports = router
