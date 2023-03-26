const models = require('../models')

/**
 * *getTagGroupsList*
 * *This function return a JSON with all the tag groups from our DB*
 * @returns {JSON}
 */
const getTagGroupsList = async () => {
  try {
    const tagGroups = await models.Tag_Group.findAll();
    if(!tagGroups) {
      throw new Error('Tag groups not found controller getTagGroupsList');
    }
    return tagGroups;
  } catch (error) {
    console.log('Error at get tag groups at controller getTagGroupsList: ' + error.message);
  }
}
/**
 * *getTagGroupsById*
 * *This function return a JSON with one tag group from our DB by id*
 * @param {String}
 * @returns {JSON}
 */
const getTagGroupsById = async (id) => {
  try {
    console.log('hi')
    if(!id){
      throw new Error('id not given in controller getTagGroupsById');
    }
    const tagGroup = await models.Tag_Group.findOne({ where: { id } });
    if(!tagGroup){
      throw new Error('tagGroup not found in controller getTagGroupsById');
    }
    return tagGroup;
  } catch (error) {
    console.log('Error at get tag group at controller getTagGroupsById: ' + error.message);
  }
}
/**
 * *createTagGroup*
 * *This function return a JSON with one tag group that has been created. We need to receive a name.*
 * @param {name}
 * @returns {JSON}
 */
const createTagGroup = async ({name,id}) => {
  try {
    if(!name || !id){
      throw new Error('name or tag id not given at createTagGroup controller');
    }
    const tag = await models.Tag.findOne({where: {id}});
    if(!tag){
      throw new Error('tag not found at createTagGroup controller');
    }
    const newTagGroup = await models.Tag_Group.create({name});

    if(!newTagGroup){
      throw new Error('newTagGroup could not be created at createTagGroup controller');
    }
    const tagTagGroup = {
      groupTagId: newTagGroup.id,
      tagId: tag.id
    }
    const createdRelation = await models.Tag_Tag_Group.create(tagTagGroup)
    if(!createdRelation) {
      throw new Error('hi tio');
    }
    return newTagGroup;
  } catch (error) {
    console.log('Error at create tag group at controller getTagGroupsById: ' + error.message);
  }
}
/**
 * *updateTagGroup*
 * *This function return a JSON with one tag group that has been updated. We need to receive a id and the data that must been modify.*
 * @param {name}
 * @returns {JSON}
 */
const updateTagGroup = async (id, data) => {
  try {
    if(!id || !data) {
      throw new Error('id or data is not given at updateTagGroup controller');
    }
    const tagGroup = await models.Tag_Group.getTagGroupsById(id)
    if(!tagGroup) {
      throw new Error('tag group not found at updateTagGroup controller');
    }
    const updatedTagGroup = await models.Tag_Group.update(
      { ...data },
      {where: {id}}
    );
    if(!updatedTagGroup) {
      throw new Error('tag group not updated at updateTagGroup controller');;
    }
    return updatedTagGroup;
  } catch (error) {
    console.log('Error at update tag group at controller updateTagGroup: ' + error.message);
  }
}
/**
 * *removeTagGroup*
 * *This function return a Boolean depending on if a tag group has been removed from our DB. We need to receive a id.*
 * @param {name}
 * @returns {JSON}
 */
const removeTagGroup = async (id) => {
  try {
    if(!id){
      throw new Error('id not given in controller removeTagGroup');
    }
    const deleted = await models.Tag_Group.destroy({ where: { id } });
    if(!deleted) {
      throw new Error('tag group was not deleted at removeTagGroup controller');
    }
    const tagGroup = await models.Tag_Group.findOne({ where: { id } });
    if(tagGroup) {
      throw new Error('tag group was found, so has not been deleted');
    }
    return true
  } catch (error) {
    console.log('Error at delete tag group at controller removeTagGroup: ' + error.message);
  }
}

module.exports = {
  getTagGroupsList,
  getTagGroupsById,
  createTagGroup,
  updateTagGroup,
  removeTagGroup,
}