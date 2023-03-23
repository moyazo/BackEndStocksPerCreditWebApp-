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

module.exports = {
  getTagsList,
  getTagsById,
  createTag,
  updateTag,
  removeTag,
}