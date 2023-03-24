const models = require('../models')

//Hablar con front ¿que task? ?q inversion? ¿time min y max? Filtros!!
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
  minInvest,
  actionPerCredit,
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
    minInvest,
    actionPerCredit,
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

const latestProject = async () => {
  const project = await models.Project.findAll({
    order: [['duration', 'ASC']],
    where: {
      duration: { $gte: new Date() },
    },
  })
  return project
}

const topProject = async () => {
  const project = await models.Project.findAll({
    order: [['minInvest', 'DESC']],
    where: {
      duration: { $gte: new Date() },
    },
  })
  return project
}

const totalAmountProject = async () => {
  const project = await models.User_Investing_Projects.findAll({
    attributes: [[sequelize.fn('sum', sequelize.col('amount')), 'total']],
  })
  return project
}

const ratioSuccessProject = async () => {
  const amounts = await models.User_Investing_Projects.findAll({
    attributes: [[sequelize.fn('sum', sequelize.col('amount')), 'total']],
    // group: ['projectId'],
  })
  const goals = await models.Project.findAll()
  /**
   * investing [{projectId, amount}]
   *
   * projects [{id, goal}]
   *
   * const ratio = projects.reduce((p, n)=>, {
   * const totalInvest = investing.find((invest)=>invest.projectId === n.id)
   * let total = 0;
   * if(totalInvest){
   * total= totalInvest.amount
   * }
   *
   * if(total > 0 && total >= n.goal){
   *    return p + 1
   * }
   * 
   * return p
   *
   * }, 0)/projects.length
   * 
   * return ratio;
   */
  return {
    goals,
    amounts,
  }
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
