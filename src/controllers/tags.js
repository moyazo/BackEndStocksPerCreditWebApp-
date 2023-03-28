const models = require('../models')

const getTagsList = async () => {
  try {
    return await models.Tag.findAll()
  } catch (error) {
    console.log('Error at get Tags at controller getTagsList: ' + error.message)
    throw new Error(error)
  }
}

const getTagsById = async (id) => {
  try {
    if (!id) {
      throw new Error('id not given in controller getTagGroupsById')
    }
    const tag = await models.Tag.findOne({ where: { id } })
    if (!tag) {
      throw new Error('Tag not found controller getTagsById')
    }
    return tag
  } catch (error) {
    console.log('Error at get Tag at controller getTagsById: ' + error.message)
    throw new Error(error)
  }
}

const createTag = async (name, tagGroupId) => {
  // TODO crear relacion con tag group
  try {
    if (!name) {
      throw new Error('name not given in controller createTag')
    }
    return await models.Tag.create(name)
  } catch (error) {
    console.log('Error at create Tag at controller createTag: ' + error.message)
    throw new Error(error)
  }
}

const updateTag = async (id, data) => {
  try {
    if (!id || !data) {
      throw new Error('id or data is not given at updateTag controller')
    }
    const tag = await models.Tag.getTagsById(id)
    if (!tag) {
      throw new Error('tag not found at updateTagGroup controller')
    }
    await models.Tag.update({ ...data }, { where: { id } })

    return await getTagsById(id)
  } catch (error) {
    console.log('Error at update Tag at controller updateTag: ' + error.message)
    throw new Error(error)
  }
}

const toggleTagTagGroup = async (tag_id, groupTag_id) => {
  try {
    if (!tag_id || !groupTag_id) {
      throw new Error(
        'tag_id or groupTag_id is not given at toggleTagTagGroup controller'
      )
    }
    const tag = await models.Tag.findOne({
      where: { id: tag_id },
      include: {
        model: models.Tag_Group,
        as: 'TagGroup',
      },
    })
    const groupTag = await models.Tag_Group.findOne({
      where: { id: groupTag_id },
      include: {
        model: models.Tag,
        // TODO actualizar relación a tags
        as: 'tags',
      },
    })
    if (!tag || !groupTag) {
      throw new Error('Tag or groupTag not found')
    }

    const tagFounded = groupTag.tags.find((tag) => tag.id === tag_id)

    if (tagFounded) {
      await models.Tag_Tag_Group.destroy({
        where: { tagId: tag_id, groupTagId: groupTag_id },
      })
    } else {
      await models.Tag_Tag_Group.create({
        tagId: tag_id,
        groupTagId: groupTag_id,
      })
    }

    return true
  } catch (error) {
    console.log(
      'Error at toggle Tag at controller toggleTagTagGroup: ' + error.message
    )
    throw new Error(error)
  }
}

module.exports = {
  getTagsList,
  getTagsById,
  createTag,
  updateTag,
  toggleTagTagGroup,
}
