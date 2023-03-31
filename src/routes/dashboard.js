'use strict'
const router = require('express').Router()
const {
  getProjectsList,
  getProjectsGeneral,
} = require('../controllers/projects')
// TODO GET DASHBOARD ENTREPRENEUR
/**
 * *ALL DATA FROM PROJECTS FOR ENTREPRENEUR*
 * *localhost:8000/dashboard/entrepreneur*
 * @param {Request} req
 * @param {Response} res
 * @return {JSON}
 */
router.get('/entrepreneur', async (req, res) => {
  try {
    const projects = await getProjectsGeneral(req.user.id)
    res.status(200).json(projects)
  } catch (error) {
    res.status(500).json(error.message)
  }
})
/**
 * *ALL DATA FROM PROJECTS FOR ENTREPRENEUR WITH FILTERS*
 * *localhost:8000/dashboard/entrepreneur*
 * @param {Request} req
 * @param {Response} res
 */
router.get('/investor', async (req, res) => {
  try {
    console.log(req.user.id)
    let filters = req.query
    filters = { ...filters, userId: req.user.id }
    const projects = await getProjectsList(filters)
    console.log({ projects })
    res.status(200).json(projects)
  } catch (error) {
    res.status(500).json(error.message)
  }
})

module.exports = router
