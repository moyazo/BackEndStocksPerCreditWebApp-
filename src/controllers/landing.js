const models = require('../models')
const { Op, Sequelize } = require('sequelize')
const latestProject = async () => {
  try {
    const projects = await models.Project.findAll({
      order: [['duration', 'ASC']],
      where: {
        duration: { [Op.gt]: new Date() },
      },
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
      order: [['totalInvest', 'DESC']],
    })
    if (!projects) {
      throw new Error('projects not found')
    }
    const firstThreeProjects = projects.slice(0, 3)
    return firstThreeProjects
  } catch (error) {
    console.log(
      'Error at bring top projects at controller topProject' + error.message
    )
  }
}

const eightTopProject = async () => {
  try {
    const projects = await models.Project.findAll({
      order: [['totalInvest', 'DESC']],
    })
    if (!projects) {
      throw new Error('projects not found')
    }
    const firstThreeProjects = projects.slice(0, 8)
    return firstThreeProjects
  } catch (error) {
    console.log(
      'Error at bring top projects at controller topProject' + error.message
    )
  }
}
const eightLatestProject = async () => {
  try {
    const currentDate = new Date()
    const oneMonthFromNow = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 31
    )
    const projects = await models.Project.findAll({
      order: [['duration', 'DESC']],
      where: {
        duration: { [Op.gt]: currentDate, [Op.lte]: oneMonthFromNow },
      },
    })
    const firstThreeProjects = projects.slice(0, 8)
    const lastThreeProjects = projects.slice(-8)
    return [...firstThreeProjects, ...lastThreeProjects]
  } catch (error) {
    console.log(
      'Error at bring latest projects at controller eightLatestProject' +
        error.message
    )
  }
}

// all la pasta
const totalAmountProject = async () => {
  try {
    const project = await models.Project.findAll({
      attributes: [
        [Sequelize.fn('sum', Sequelize.col('totalInvest')), 'total'],
      ],
    })
    const totalAmount = parseInt(project[0].dataValues.total)
    return totalAmount
  } catch (error) {
    console.log('Error at get total amount at controller: ' + error.message)
  }
}

const ratioSuccessProject = async () => {
  const projects = await models.Project.findAll()
  const projectsGoals = projects.map((project) => {
    const dataValues = project.dataValues
    return {
      id: dataValues.id,
      goal: dataValues.goal,
      total: dataValues.totalInvest,
    }
  })
  const successInversion = projectsGoals.filter((goal) => {
    if (goal.goal === goal.total || goal.goal < goal.total) {
      return goal.id
    }
  })
  return successInversion.length / projects.length
}

module.exports = {
  latestProject,
  topProject,
  totalAmountProject,
  ratioSuccessProject,
  eightTopProject,
  eightLatestProject,
}
