const models = require('../models')

const getTagsList = async () => {
  const tag = await models.Tag.findAll()
  return tag
}

const getTagsById = async (id) => {
  const tag = await models.Tag.findOne({ where: { id } })
  return tag
}

const createTag = async (name) => {
  const tag = await models.Tag.create(name)
  return tag
}

const updateTag = async (id, data) => {
  await models.Tag.update(
    { ...data },
    {
      where: {
        id,
      },
    }
  )

  return getTagsById(id)
}

const removeTag = async (id) => {
  await models.Tag.destroy({
    where: {
      id,
    },
  })

  return true
}

const toggleTagTagGroup = async (tag_id, groupTag_id) => {

  const tag = await models.Tag.findOne({
    where: { id: tag_id },
    include: { 
      model: models.Tag_Group,
      as: 'TagGroup'
    }
  });
  const groupTag = await models.Tag_Group.findOne({
    where: { id: groupTag_id },
    include: { 
      model: models.Tag,
      as: 'GroupTag'
    }
  });
  if(!tag || !groupTag) {
    throw new Error('Tag or groupTag not found');
  }
  const GroupsOfTag = groupTag.GroupTag;
  const tagFounded = GroupsOfTag.find(tag => tag.dataValues.Tag_Tag_Group.dataValues.tagId === tag_id);
  if(tagFounded){
    await models.Tag_Tag_Group.destroy({
      where: { tagId: tag_id, groupTagId: groupTag_id }
    });
  }else{
    await models.Tag_Tag_Group.create({ tagId: tag_id, groupTagId: groupTag_id });
  }
  return true;
}

module.exports = {
  getTagsList,
  getTagsById,
  createTag,
  updateTag,
  removeTag,
  toggleTagTagGroup
}