const router = require('express').Router()
const {
    latestProject,
    topProject,
    totalAmountProject,
    ratioSuccessProject
} = require('../controllers/landing');
const { getProjectsList } = require('../controllers/projects');
router.get('/', async (req,res) => {
    try {   
        let allData
        const totalProjects = await getProjectsList('');
        const latestProjects = await latestProject();
        const topProjects = await topProject();
        const totalAmount = await totalAmountProject();
        const ratioSuccess = await ratioSuccessProject();
        console.log({totalProjects})
        if(!latestProjects || !topProjects || !totalAmount){
            res.status(502).json('missing some data from landing values');
        }
        allData = {
            latestProjects,
            topProjects,
            totalAmount,
            ratioSuccess,
            totalProjects: totalProjects.length
        }
        res.status(200).json(allData);
    } catch (error) {
        console.log('Error at landing route: ' + error.message);
    }
});


module.exports = router