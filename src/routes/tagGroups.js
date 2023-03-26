const router = require('express').Router()
const {
  getTagGroupsList,
  getTagGroupsById,
  createTagGroup,
  updateTagGroup,
  removeTagGroup
} = require('../controllers/tagGroups')
/**
 * *Tag groups END-POINT*
 * *localhost:8000/tagGroups*
 * *This end-point give a JSON with all the tags groups in our DB using /controllers/tagGroups.js*
 * @param {Request} request
 * @param {Response} response
 * @returns {JSON}
 */
router.get('/', async (request, response) => {
  try {
    const TagGroups = await getTagGroupsList();
    if(!TagGroups){
      response.status(502).json('TagGroups not given from controller');
    }
    response.status(200).json(TagGroups)
  } catch (error) {
    response.status(500).json('Error at get TagGroups list route: ' + error.message)
  }
})
/**
 * *Tag group END-POINT*
 * *localhost:8000/tagGroups/:id*
 * *This end-point give a JSON with one tag group by id in our DB using /controllers/tagGroups.js*
 * @param {Request} request
 * @param {Response} response
 * @returns {JSON}
 */
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    if(!id){
      response.status(403).json('id not specified at request.params');
    }
    const tagGroup = await getTagGroupsById(id);
    if(!tagGroup){
      response.status(502).json('tagGroup not given from controller');
    }
    response.status(200).json(tagGroup);
  } catch (error) {
    response.status(500).json('Error at get TagGroup route: ' + error.message);
  }
})
/**
 * *Tag group END-POINT*
 * *localhost:8000/tagGroups*
 * *This end-point give a JSON with one tag group by id in our DB using /controllers/tagGroups.js*
 * @param {Request} request
 * @param {Response} response
 * @returns {JSON}
 */
router.post('/', async (request, response) => {
  try {
    const newData = request.body;
    if(!newData){
      response.status(403).json('newData not given at request.body');
    }
    const newTagGRoup = await createTagGroup(newData)
    if(!newTagGRoup){
      response.status(502).json('newTagGRoup not given from controller');
    }
    response.status(200).json(newTagGRoup);
  } catch (error) {
    response.status(500).json('Error at post a new Tag group route: ' + error.message);
  }
})
/**
 * *Update Tag group END-POINT*
 * *localhost:8000/tagGroups/:id*
 * *This end-point give a JSON with one tag group modified by id in our DB using /controllers/tagGroups.js*
 * @param {Request} request
 * @param {Response} response
 * @returns {JSON}
 */
router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const data = request.body
    if(!id || !data) {
      response.status(403).json('id or data not given at request time');
    }
    const tagGroup = await updateTagGroup(id, data)
    if(!tagGroup){
      response.status(502).json('tagGroup not given from controller');
    }
    response.status(200).json(project)
  } catch (error) {
    response.status(500).json('Error at put a Tag group route: ' + error.message);
  }
})
/**
 * *Delete Tag group END-POINT*
 * *localhost:8000/tagGroups/:id*
 * *This end-point give a Boolean depending if a tag group has been removed by id in our DB using /controllers/tagGroups.js*
 * @param {Request} request
 * @param {Response} response
 * @returns {JSON}
 */
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params
    if(!id){
      response.status(403).json('id not given at request.params')
    }
    const removed = await removeTagGroup(id)
    if(!removed){
      response.status(502).json('tag group not removed from controller')
    }
    response.status(200).json(removed)
  } catch (error) {
    response.status(500).json('Error at delete a Tag group route: ' + error.message);
  }
})




module.exports = router
