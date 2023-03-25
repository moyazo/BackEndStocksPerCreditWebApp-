const models = require('../models')

//Hablar con front ¿que task? ?q inversion? ¿time min y max? Filtros!!
const getProjectsList = async () => {
  try {
    const projects = await models.Project.findAll();
    if(!projects){
      throw new Error('Error at find projects at controller getProjectsList');
    }
    return projects;
  } catch (error) {
    console.log('Error at get projects at controller getProjectsList: ' + error.message);
  }
}

const getProjectsById = async (id) => {
  try {
    if(!id){
      throw new Error('id not given in controller getTagGroupsById');
    }
    const project = await models.Project.findOne({ where: { id } })
    if(!project){
      throw new Error('Error at find project at controller getProjectsById');
    }
    return project
  } catch (error) {
    console.log('Error at get project at controller getProjectsById: ' + error.message);
  }
}

const createProject = async (data) => {
  try {
    if(!data){
      throw new Error('Data not given at createProject controller');
    }
    const project = await models.Project.create(data);
    if(!project){
      throw new Error('Error at creating project at controller createProject');
    }
    return project;
  } catch (error) {
    console.log('Error at create project at controller createProject: ' + error.message);
  }
}

const updateProject = async (id, data) => {
  try {
    if(!id || !data) {
      throw new Error('id or data is not given at updateProject controller');
    }
    const project = await models.Project.getProjectsById(id)
    if(!project) {
      throw new Error('project not found at updateTagGroup controller');
    }
    const updatedProject = await models.Project.update(
      { ...data },
      { where: { id } }
    )
    if(!updatedTagGroup) {
      throw new Error('tag group not updated at updateTagGroup controller');;
    }
  } catch (error) {
    console.log('Error at update project at controller updateProject: ' + error.message);
  }
  return getProjectsById(id)
}

const removeProject = async (id) => {
  try {
    if(!id){
      throw new Error('id not given in controller removeProject');
    }
    const deleted = await models.Project.destroy({ where: { id } });
    if(!deleted) {
      throw new Error('project was not deleted at removeProject controller');
    }
    const project = await models.Project.findOne({ where: { id } });
    if(project) {
      throw new Error('project was found, so has not been deleted');
    }
    return true
  } catch (error) {
    console.log('Error at delete project at controller removeProject: ' + error.message);
  }
}

const latestProject = async () => {
  const projects = await models.Project.findAll({
    order: [['duration', 'ASC']],
    where: {
      duration: { $gte: new Date() },
    },
  });

  const firstThreeProjects = projects.slice(0, 3);
  const lastThreeProjects = projects.slice(-3); 

  return {...firstThreeProjects, ...lastThreeProjects};
};


const topProject = async () => {
  const project = await models.Project.findAll({
    order: [['minInvest', 'DESC']],
    where: {
      duration: { $gte: new Date() },
    },
  })
  return project
}
// all la pasta
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
