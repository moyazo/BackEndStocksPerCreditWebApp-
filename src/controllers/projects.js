const models = require('../models')
const { Op } = require('sequelize')
const { UserRole } = require('../common/constants')

/**
 *
 * @param {object} filters
 * @param {number} filters.goal
 * @param {Date} filters.returnInvestment
 * @param {string} filters.userId
 * @param {boolean} filters.favorites
 * @param {boolean} filters.investments
 * @return {Promise<models[]>}
 */
const getProjectsList = async (filters) => {
  try {
    let whereClause = {}
    let whereClauseFavorites = {}
    let whereClauseInvestments = {}
    let whereClauseGoal = {}
    let whereClauseReturnInvestments = {}

    if (filters) {
      if (filters.favorites && filters.userId) {
        whereClauseFavorites = {
          model: models.User,
          as: 'favoriteProjects',
          through: {
            model: models.User_Favorites_Projects,
            as: 'favoriteProjects',
            attributes: ['id', 'userId', 'projectId'],
          },
          where: { id: filters.userId },
        }
      }

      if (filters.investments && filters.userId) {
        whereClauseInvestments = {
          model: models.User,
          as: 'investingProjects',
          through: {
            model: models.User_Investing_Projects,
            as: 'investingProjects',
            attributes: ['id', 'userId', 'projectId', 'amount', 'totalAmount'],
          },
          where: { id: filters.userId },
        }
      }

      if (filters.goal.min && filters.goal.max) {
        whereClauseGoal = {
          goal: {
            [Op.and]: [
              { [Op.gt]: filters.goal.min },
              { [Op.lt]: filters.goal.max },
            ],
          },
        }
      }

      if (filters.returnInvestment) {
        whereClauseReturnInvestments = {
          returnInvestment: {
            [Op.gt]: new Date(filters.returnInvestment),
          },
        }
      }
    }

    whereClause = {
      [Op.and]: [
        whereClauseFavorites,
        whereClauseInvestments,
        whereClauseGoal,
        whereClauseReturnInvestments,
      ],
    }
    console.log(whereClause)
    return await models.Project.findAll({
      where: whereClause[Op.and] || null,
    })
  } catch (error) {
    console.log(
      'Error at get projects at controller getProjectsList: ' + error.message
    )
    throw new Error(error)
  }
}

/**
 *
 * @param {string} id
 * @return {Promise<Model|null>}
 */
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
    throw new Error(error)
  }
}

const createProject = async ({ tags, ...partial }, user) => {
  try {
    if (!partial) {
      throw new Error('Missing project data')
    }

    if (!tags || tags.length <= 0) {
      throw new Error('Missing project tags')
    }

    if (user.role === UserRole.INVESTOR) {
      throw new Error('You dont have permissions')
    }

    const project = await models.Project.create({ ...data, userId: user.id })

    /**
     * TODO AQUI Debemos crear la asociación del proyecto con las tags
     */

    return project
  } catch (error) {
    console.log(
      'Error at create project at controller createProject: ' + error.message
    )
    throw new Error(error)
  }
}

const updateProject = async (id, data) => {
  try {
    if (!id || !data) {
      throw new Error('id or data is not given at updateProject controller')
    }
    const project = await getProjectsById(id)

    if (!project) {
      throw new Error('project not found at updateTagGroup controller')
    }

    await models.Project.update({ ...data }, { where: { id } })

    return getProjectsById(id)
  } catch (error) {
    console.log(
      'Error at update project at controller updateProject: ' + error.message
    )
  }
}
const removeProject = async (id) => {
  try {
    if (!id) {
      throw new Error('id not given in controller removeProject')
    }

    const project = await models.Project.findOne({ where: { id } })
    if (project) {
      throw new Error('project was found, so has not been deleted')
    }

    const deleted = await models.Project.destroy({ where: { id } })
    if (!deleted) {
      throw new Error('project was not deleted at removeProject controller')
    }

    return true
  } catch (error) {
    console.log(
      'Error at delete project at controller removeProject: ' + error.message
    )
  }
}

module.exports = {
  getProjectsList,
  getProjectsById,
  createProject,
  updateProject,
  removeProject,
}
