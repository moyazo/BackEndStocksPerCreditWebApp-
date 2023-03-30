const models = require('../models')

/**
 * *getTagGroupsList*
 * *This function return a JSON with all the tag groups from our DB*
 * @returns {JSON}
 */
const getTagGroupsList = async () => {
  try {
    return await models.Tag_Group.findAll({
      include: {
          model: models.Tag,
          as: 'GroupTag'
        }
    });
    
  } catch (error) {
    console.log(
      'Error at get tag groups at controller getTagGroupsList: ' + error.message
    )
    throw new Error(error)
  }
}

/**
 * *getTagGroupsById*
 * *This function return a JSON with one tag group from our DB by id*
 * @param {string} id
 * @returns {JSON}
 */
const getTagGroupsById = async (id) => {
  try {
    if (!id) {
      throw new Error('id not given in controller getTagGroupsById')
    }
    const tagGroup = await models.Tag_Group.findOne({ where: { id } })
    if (!tagGroup) {
      throw new Error('tagGroup not found in controller getTagGroupsById')
    }

    return tagGroup
  } catch (error) {
    console.log(
      'Error at get tag group at controller getTagGroupsById: ' + error.message
    )
    throw new Error(error)
  }
}

/**
 * *createTagGroup*
 * *This function return a JSON with one tag group that has been created. We need to receive a name.*
 * @param {string} name
 * @returns {JSON}
 */
const createTagGroup = async ({ name }) => {
  try {
    if (!name || !id) {
      throw new Error('name or tag id not given at createTagGroup controller')
    }

    return await models.Tag_Group.create({ name })
  } catch (error) {
    console.log(
      'Error at create tag group at controller getTagGroupsById: ' +
        error.message
    )
    throw new Error(error)
  }
}
/**
 * *updateTagGroup*
 * *This function return a JSON with one tag group that has been updated. We need to receive a id and the data that must been modify.*
 * @param {string} id
 * @param {object} data
 * @returns {JSON}
 */
const updateTagGroup = async (id, data) => {
  try {
    if (!id || !data) {
      throw new Error('id or data is not given at updateTagGroup controller')
    }
    const tagGroup = await getTagGroupsById(id)
    if (!tagGroup) {
      throw new Error('tag group not found at updateTagGroup controller')
    }

    await models.Tag_Group.update({ ...data }, { where: { id } })

    return await getTagGroupsById(id)
  } catch (error) {
    console.log(
      'Error at update tag group at controller updateTagGroup: ' + error.message
    )
    throw new Error(error)
  }
}

module.exports = {
  getTagGroupsList,
  getTagGroupsById,
  createTagGroup,
  updateTagGroup,
}
