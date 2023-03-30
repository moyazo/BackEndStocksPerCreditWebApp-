'use strict';
const router = require('express').Router();
const {
  getProjectsList,
  getProjectsGeneral
} = require('../controllers/projects');
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
    const projects = await getProjectsGeneral(req.user.id);
    res.status(200).json(projects)
  } catch (error) {
    res.status(500).json(error.message);
  }
});
/**
 * *ALL DATA FROM PROJECTS FOR ENTREPRENEUR WITH FILTERS*
 * *localhost:8000/dashboard/entrepreneur*
 * @param {Request} req
 * @param {Response} res
 */
router.get('/investor', async (req, res) => {
  try {
    let filters = req.query
    filters = {...filters, userId: req.user.id}
    const projects = await getProjectsList(filters);
    res.status(200).json(projects)
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router









// TODO GET DASHBOARD INVESTOR
// TODO GET PROJECTS FILTERS
/** ENTREPRENEUR */
// PROJECTS ENTREPRENEUR POR ID DEL USER(ENTREPRENEUR) 'req.user.id'
  // - ¿FILTERS?
  // - PROJECTS EN LOS QUE SE HA INVERTIDO + ¡¿amount?! + totalAmount + totalInvestors( COUNT DE CADA REGISTRO DE LA TABLA User_Investing_Projects ) + INVESTORS
  // - ¿ TOTAL COLLECTED, RATIO SUCCESS, TOP?

  // TODO PROFILE ENTREPRENEUR
  // - DATA DE USER

// TODO VIEW CREATE PROJECT -> ROUTE PROJECT
 // - ENLAZARLO CON: tag, entrepreneur
 // - CREATE VARIOS PARA PROBAR DATOS DE LANDING

/** INVESTOR */
  // PROJECTS INVESTOR
   // - ALL LOS PROJECTS
   // - TOP PROJECTS (QUIEN TIENE MÁS totalInvest)
   // TODO - CLOSE Y RECIENTES (de hoy a 1 mes: los que cierran(duration) y los más recientes(createdAt + ¿duration?))
   // TODO PROJECTS CON FILTROS

     // - GOAL (RANGO // TODO min ----- max)
     // - returnInvestment (DATE)
     // TODO - TAGS 
     // - FAVORITES (buscar por id de project en User_Favorites_Projects)
     // - INVERTIDOS (buscar por id de project en User_Investing_Projects)
     // - ¿ TOTAL WASTE, RATIO SUCCESS, TOP?

// TODO PROFILE INVESTOR
  // - DATA DE USER
  

