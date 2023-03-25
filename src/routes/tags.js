const router = require('express').Router()
const {
    getTagsList,
    getTagsById,
    createTag,
    updateTag,
    removeTag,
    toggleTagTagGroup
} = require('../controllers/tags')
router.get('/', async (request, response) => {
  try {
    const tags = await getTagsList();
    if(!tags){
      response.status(502).json('tags not given from our controller');
    }
    response.status(200).json(tags);
  } catch (error) {
    response.status(500).json('Error at get tags route: ' + error.message);
  }
})
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    if(!id){
      response.status(403).json('id not given at request.params');
    }
    const tag = await getTagsById(id);
    if(!tag){
      response.status(502).json('tag not given from our controller');
    }
    response.status(200).json(tag)
  } catch (error) {
    response.status(500).json('Error at get tag route: ' + error.message);
  }
})

router.post('/', async (request, response) => {
  try {
    const newData = request.body;
    if(!newData){
      response.status(403).json('body not given at request.body');
    }
    const newTag = await createTag(newData);
    if(!newTag){
      response.status(502).json('newTag not given from our controller');
    }
    response.status(200).json(newTag);
  } catch (error) {
    response.status(500).json('Error at post tag route: ' + error.message);
  }
})

router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const data = request.body;
    if(!id || !newData){
      response.status(403).json('id or body not given at request');
    }
    const updatedTag = await updateTag(id, data);
    if(!updatedTag){
      response.status(502).json('updatedTag not given from our controller');
    }
    response.status(200).json(project);
  } catch (error) {
    response.status(500).json('Error at put tag route: ' + error.message);
  }
})
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    if(!id){
      response.status(403).json('id not given at request.params');
    }
    const deletedTag = await removeTag(id);
    if(!deletedTag){
      response.status(502).json('deletedTag not given from our controller');
    }
    response.status(200).json(true);
  } catch (error) {
    response.status(500).json('Error at delete tag route: ' + error.message);
  }
})

router.post('/toggle-tag-group', async (request, response) => {
  try {
    const { tag_id, groupTag_id } = request.body;
    if(!tag_id || !groupTag_id){
      response.status(403).json('tag_id or groupTag_id not given at request.body');
    }
    const tagAdded = await toggleTagTagGroup(tag_id, groupTag_id);
    if(!tagAdded){
      response.status(502).json('tagAdded not given from our controller');
    }
    response.status(200).json(tagAdded)
  } catch (error) {
    response.status(500).json('Error at toggle tag route: ' + error.message);
  }
})

module.exports = router