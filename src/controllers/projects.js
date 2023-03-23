const models = require('../models')

const getProjectsList = async () => {
  const project = await models.Project.findAll()
  return project
}

const getProjectsById = async (id) => {
  const project = await models.Project.findOne({ where: { id } })
  return project
}

const createProject = async ({
  name,
  image,
  goal,
  min_invest,
  action_per_credit,
  currency,
  duration,
  history,
  proposal,
  cost,
  commerce,
}) => {
  const project = await models.Project.create({
    name,
    image,
    goal,
    min_invest,
    action_per_credit,
    currency,
    duration,
    history,
    proposal,
    cost,
    commerce,
  })
  return project
}

const updateProject = async (id, data) => {
  await models.Project.update(
    { ...data },
    {
      where: {
        id,
      },
    }
  )

  return getProjectsById(id)
}

const removeProject = async (id) => {
  await models.Project.destroy({
    where: {
      id,
    },
  })

  return true
}

module.exports = {
  getProjectsList,
  getProjectsById,
  createProject,
  updateProject,
  removeProject,
}
