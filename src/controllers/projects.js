const models = require('../models')
const { Op, Sequelize } = require('sequelize')
const getProjectsList = async (filters) => {
  try {
      const whereClause = createWhereClause(filters);   
      const projects = await models.Project.findAll(whereClause);
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
const createProject = async (data, id) => {
  try {
    if (!data) {
      throw new Error('data or tag id not given at createProject controller')
    }
    // const tag = await models.Tag.findOne({where: {id}});
    // if(!tag){
    //   throw new Error('tag not found at createProject controller');
    // }
    const newProject = await models.Project.create(data)

    if (!newProject) {
      throw new Error(
        'newProject could not be created at createProject controller'
      )
    }
    // const tagProject = {
    //   projectId: newProject.id,
    //   tagId: tag.id
    // }
    // console.log({tagProject})
    // const createdRelation = await models.Project_Tag.create(tagProject)
    // console.log('hi2')
    // if(!createdRelation) {
    //   throw new Error('hi tio');
    // }
    return newProject
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
const createWhereClause = (filters) => {
  let whereClause = {}; 
  let numOfFilter = 0;
  const goalFilter = filters.goal
  const returnInvestFilter = filters.returnInvestment
  
  if(!goalFilter && returnInvestFilter || goalFilter && !returnInvestFilter){
    numOfFilter = 1;
  }else if(goalFilter && returnInvestFilter){
    numOfFilter = 2;
  }else{
    return {where: null}
  }
  
  switch (numOfFilter) {
    case 1:
      if(!goalFilter){
        whereClause = {where:{returnInvestment:{[Op.gt]: returnInvestFilter}}}
      }else{
        whereClause = {where:{goal: {[Op.gte]: goalFilter}}}
      }
      break;
    case 2:
      whereClause = {where:{returnInvestment:{[Op.gt]: returnInvestFilter}, goal: {[Op.gte]: goalFilter}}}
        break;
    default:
      whereClause = {where:{returnInvestment:null, goal: null}}
      break;
  }
  return whereClause
}

module.exports = {
  getProjectsList,
  getProjectsById,
  createProject,
  updateProject,
  removeProject,
}
