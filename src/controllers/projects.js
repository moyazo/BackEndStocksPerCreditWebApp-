const models = require('../models')
const { Op, Sequelize } = require('sequelize')
//Hablar con front ¿que task? ?q inversion? ¿time min y max? Filtros!!
const getProjectsList = async () => {
  try {
    const projects = await models.Project.findAll()
    if (!projects) {
      throw new Error('Error at find projects at controller getProjectsList')
    }
    return projects
  } catch (error) {
    console.log(
      'Error at get projects at controller getProjectsList: ' + error.message
    )
  }
}

const getProjectsById = async (id) => {
  try {
    if (!id) {
      throw new Error('id not given in controller getTagGroupsById')
    }
    const project = await models.Project.findOne({ where: { id } })
    if (!project) {
      throw new Error('Error at find project at controller getProjectsById')
    }
    return project
  } catch (error) {
    console.log(
      'Error at get project at controller getProjectsById: ' + error.message
    )
  }
}

const createProject = async (data) => {
  try {
    if (!data) {
      throw new Error('Data not given at createProject controller')
    }
    const project = await models.Project.create(data)
    if (!project) {
      throw new Error('Error at creating project at controller createProject')
    }
    return project
  } catch (error) {
    console.log(
      'Error at create project at controller createProject: ' + error.message
    )
  }
}

const updateProject = async (id, data) => {
  try {
    if (!id || !data) {
      throw new Error('id or data is not given at updateProject controller')
    }
    const project = await models.Project.getProjectsById(id)
    if (!project) {
      throw new Error('project not found at updateTagGroup controller')
    }
    const updatedProject = await models.Project.update(
      { ...data },
      { where: { id } }
    )
    if (!updatedTagGroup) {
      throw new Error('tag group not updated at updateTagGroup controller')
    }
  } catch (error) {
    console.log(
      'Error at update project at controller updateProject: ' + error.message
    )
  }
  return getProjectsById(id)
}

const removeProject = async (id) => {
  try {
    if (!id) {
      throw new Error('id not given in controller removeProject')
    }
    const deleted = await models.Project.destroy({ where: { id } })
    if (!deleted) {
      throw new Error('project was not deleted at removeProject controller')
    }
    const project = await models.Project.findOne({ where: { id } })
    if (project) {
      throw new Error('project was found, so has not been deleted')
    }
    return true
  } catch (error) {
    console.log(
      'Error at delete project at controller removeProject: ' + error.message
    )
  }
}

const latestProject = async () => {
  try {
    const projects = await models.Project.findAll({
      order: [['duration', 'ASC']],
    })
    const firstThreeProjects = projects.slice(0, 3)
    const lastThreeProjects = projects.slice(-3)
    return [...firstThreeProjects, ...lastThreeProjects]
  } catch (error) {
    console.log(
      'Error at bring latest projects at controller latestProject' +
        error.message
    )
  }
}

const topProject = async () => {
  try {
    const projects = await models.Project.findAll({
    order: [['totalInvest', 'DESC']]
  })
  if(!projects) {
    throw new Error('projects not found')
  }
  const firstThreeProjects = projects.slice(0, 3)
  return firstThreeProjects;
  } catch (error) {
    console.log(
      'Error at bring top projects at controller topProject' +
        error.message
    )
  }
}
// all la pasta
const totalAmountProject = async () => {
  try {
    const project = await models.Project.findAll({
      attributes: [[Sequelize.fn('sum', Sequelize.col('totalInvest')), 'total']],
    });
    return project;
  } catch (error) {
    console.log('Error at get total amount at controller: ' + error.message);
  }
}

const ratioSuccessProject = async () => {
  const projects = await models.Project.findAll();
  const projectsGoals = projects.map(project => {
    const dataValues = project.dataValues
    return {id: dataValues.id, goal: dataValues.goal, total: dataValues.totalInvest}
  });
  const successInversion = projectsGoals.filter((goal) => {
      if(goal.goal === goal.total || goal.goal < goal.total){
        return goal.id;
      }
  })
  return successInversion.length/projects.length;
}

module.exports = {
  getProjectsList,
  getProjectsById,
  createProject,
  updateProject,
  removeProject,
  latestProject,
  topProject,
  totalAmountProject,
  ratioSuccessProject,
}
