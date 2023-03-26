const router = require('express').Router()
const {
    latestProject,
    topProject,
    totalAmountProject,
    ratioSuccessProject
} = require('../controllers/landing')
router.get('/', async (req,res) => {
    try {   
        let allData
        const latestProjects = await latestProject();
        const topProjects = await topProject();
        const totalAmount = await totalAmountProject();
        const ratioSuccess = await ratioSuccessProject();
        if(!latestProjects || !topProjects || !ratioSuccess || !totalAmount){
            res.status(502).json('missing some data from landing values');
        }
        allData = {
            latestProjects,
            topProjects,
            totalAmount,
            ratioSuccess
        }
        return allData
    } catch (error) {
        console.log('Error at landing route: ' + error.message);
    }
});


module.exports = router