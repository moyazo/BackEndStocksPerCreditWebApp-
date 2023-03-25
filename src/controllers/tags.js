const models = require('../models')

const getTagsList = async () => {
  try {
    const tags = await models.Tag.findAll()
    if (!tags) {
      throw new Error('Tags not found controller getTagsList')
    }
    return tags
  } catch (error) {
    console.log('Error at get Tags at controller getTagsList: ' + error.message)
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
  }
}

const createTag = async (name) => {
  try {
    if (!name) {
      throw new Error('name not given in controller createTag')
    }
    const newTag = await models.Tag.create(name)
    if (!newTag) {
      throw new Error('newTag could not be created at createTag controller')
    }
    return newTag
  } catch (error) {
    console.log('Error at create Tag at controller createTag: ' + error.message)
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
    const updatedTag = await models.Tag.update({ ...data }, { where: { id } })
    if (!updatedTag) {
      throw new Error('tag not updated at updateTagGroup controller')
    }
    return updatedTag
  } catch (error) {
    console.log('Error at update Tag at controller updateTag: ' + error.message)
  }
}

const removeTag = async (id) => {
  try {
    if (!id) {
      throw new Error('id not given in controller removeTag')
    }
    const tagDeleted = await models.Tag.destroy({ where: { id } })
    if (!tagDeleted) {
      throw new Error('tag not deleted at removeTag controller')
    }
    return true
  } catch (error) {
    console.log('Error at delete Tag at controller removeTag: ' + error.message)
  }
}

const toggleTagTagGroup = async (tag_id, groupTag_id) => {
  try {
    if (!tag_id || !groupTag_id) {
      throw new Error('tag_id or groupTag_id is not given at toggleTagTagGroup controller')
    }
    const tag = await models.Tag.findOne({
      where: { id: tag_id },
      include: {
        model: models.Tag_Group,
        as: 'TagGroup',
      }
    })
    const groupTag = await models.Tag_Group.findOne({
      where: { id: groupTag_id },
      include: {
        model: models.Tag,
        as: 'GroupTag',
      },
    })
    if (!tag || !groupTag) {
      throw new Error('Tag or groupTag not found')
    }
    const GroupsOfTag = groupTag.GroupTag
    const tagFounded = GroupsOfTag.find(
      (tag) => tag.dataValues.Tag_Tag_Group.dataValues.tagId === tag_id
    )
    if (tagFounded) {
      await models.Tag_Tag_Group.destroy({
        where: { tagId: tag_id, groupTagId: groupTag_id },
      })
    } else if (!tagFounded) {
      await models.Tag_Tag_Group.create({
        tagId: tag_id,
        groupTagId: groupTag_id,
      })
    }else{
      throw new Error('Something went wrong at toggleTagTagGroup controller')
    }
    return true
  } catch (error) {
    console.log('Error at toggle Tag at controller toggleTagTagGroup: ' + error.message)
  }
}

module.exports = {
  getTagsList,
  getTagsById,
  createTag,
  updateTag,
  removeTag,
  toggleTagTagGroup,
}
