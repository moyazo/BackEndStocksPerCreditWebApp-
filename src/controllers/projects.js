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

      if (filters.investmentAmount) {
        const { min, max } = JSON.parse(filters.investmentAmount)
        whereClause.goal = {
          [Op.and]: [{ [Op.gte]: min }, { [Op.lte]: max }],
        }
      }

      if (filters.date) {
        whereClause.ReturnOnInvestment = {
          [Op.and]: { [Op.lte]: new Date(filters.date), [Op.gte]: new Date() },
        }
      }

      if (filters.tags) {
        let tagsIds = []
        const groupTagsIds = filters.tags.split(',')
        const groupTags = await models.Tag_Group.findAll({
          where: { id: groupTagsIds },
          include: {
            model: models.Tag,
            as: 'GroupTag',
          },
        })
        for (const groupTag of groupTags) {
          const ids = groupTag.GroupTag.map((item) => item.id)
          tagsIds = tagsIds.concat(ids)
        }
        const tagsProjects = await models.Project_Tag.findAll({
          where: { tagId: tagsIds },
        })
        const projectsIds = tagsProjects.map((tp) => tp.projectId)

        if (projectsIds?.length > 0) {
          whereClause.id = projectsIds
        }
      }
    }

    return await models.Project.findAll({
      where: whereClause
        ? {
            [Op.and]: whereClause,
          }
        : null,
      /*include: {
        model: models.Tag,
        as: 'ProjectTag',
        where: {
          id: { [Op.in]: allTagsIds },
        },
      },*/
    })
  } catch (error) {
    console.log(
      'Error at get projects at controller getProjectsList: ' + error.message
    )
    throw new Error(error)
  }
}
const getProjectsGeneral = async (userId) => {
  if (!userId) {
    return await models.Project.findAll({
      include: {
        model: models.Tag,
        as: 'ProjectTag',
      },
    })
  } else {
    return await models.Project.findAll({
      where: { userId },
      include: {
        model: models.Tag,
        as: 'ProjectTag',
      },
    })
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
    const project = await models.Project.findOne({
      where: { id },
      include: {
        model: models.Tag,
        as: 'ProjectTag',
      },
    })
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
    let tagUserArray = []
    if (!partial) {
      throw new Error('Missing project data')
    }

    if (!tags || tags.length <= 0) {
      throw new Error('Missing project tags')
    }

    if (user.role === UserRole.INVESTOR) {
      throw new Error('You dont have permissions')
    }

    const project = await models.Project.create({ ...partial, userId: user.id })
    tags.forEach((tag) => {
      tagUserArray.push({
        tagId: tag,
        projectId: project.id,
      })
    })
    await models.Project_Tag.bulkCreate(tagUserArray)
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
const removeProject = async (id) => {
  try {
    if (!id) {
      throw new Error('id not given in controller removeProject')
    }
    await models.Project.destroy({ where: { id } })
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
  removeProject,
  getProjectsGeneral,
}
