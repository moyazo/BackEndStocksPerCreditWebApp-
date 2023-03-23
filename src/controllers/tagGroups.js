const models = require('../models')

const getTagGroupsList = async () => {
  const tagGroup = await models.Tag_Group.findAll()
  return tagGroup
}

const getTagGroupsById = async (id) => {
  const tagGroup = await models.Tag_Group.findOne({ where: { id } })
  return tagGroup
}

const createTagGroup = async (name) => {
  const tagGroup = await models.Tag_Group.create(name)
  return tagGroup
}

const updateTagGroup = async (id, data) => {
  await models.Tag_Group.update(
    { ...data },
    {
      where: {
        id,
      },
    }
  )

  return getTagGroupsById(id)
}

const removeTagGroup = async (id) => {
  await models.Tag_Group.destroy({
    where: {
      id,
    },
  })

  return true
}



module.exports = {
  getTagGroupsList,
  getTagGroupsById,
  createTagGroup,
  updateTagGroup,
  removeTagGroup,
}