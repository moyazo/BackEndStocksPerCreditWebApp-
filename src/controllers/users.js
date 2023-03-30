const db = require('../models')
const User = db.User
const Project = db.Project
const User_Investing_Projects = db.User_Investing_Projects

const getUsers = async () => {
  try {
    const users = await User.findAll()
    if (!users) {
      throw new Error('No users found in controller')
    }
    return users
  } catch (error) {
    console.log('Error at `getUsers controller` ' + error.message)
  }
}

const getUserById = async (id) => {
  try {
    if (!id) {
      return 'id not specified at getUserById controller'
    }
    const user = await User.findOne({ where: { id } })
    if (!user) {
      return 'User not found in controller `getUserById`'
    }
    return user
  } catch (error) {
    console.log('Error at `getUserById controller` ' + error.message)
  }
}

const updateUser = async (id, newData) => {
  try {
    if (!id || !newData) {
      return 'id or newData not specified at updateUser controller'
    }
    const user = await User.findOne({ where: { id } })
    if (!user) {
      return 'User not found'
    }
    const updatedUser = await User.update(newData, { where: { id } })
    if (!updatedUser) {
      return 'User could not be updated at updateUser controller'
    }
    return updatedUser
  } catch (error) {
    console.log('Error at `updateUser` controller ' + error.message)
  }
}

const getUserByEmail = async (email) => {
  try {
    if (!email) {
      return 'Email not specified at getUserByEmail controller'
    }
    const user = await User.findOne({ where: { email: email } })
    return user
  } catch (error) {
    console.log('Error at `getUserByEmail` controller ' + error.message)
  }
}

const investOnProject = async (userId, projectId, amount) => {
  try {
    if (!userId || !projectId || !amount) {
      throw new Error('user_id or project_id not specified at investOnProject controller')
    }

    if (amount <= 0) {
      throw new Error('amount must be greater than 0')
    }

    const user = await User.findOne({ where: { id: userId } })
    const project = await Project.findOne({ where: { id: projectId } })
    if (!user) {
      throw new Error('user not found')
    }
    if (!project) {
      throw new Error('project not found')
    }
    if (project.minInvest > amount) {
      throw new Error('amount must be greater than minInvest')
    }

    const newAmount = project.totalInvest + amount.total
    if (newAmount < project.totalInvest) {
      throw new Error('something went wrong in order to added a new amount')
    }
    await Project.update(
      { totalInvest: newAmount },
      { where: { id: projectId } }
    )
    let investedProject = await User_Investing_Projects.findOne({
      where: { projectId, userId },
    })
    const newAmountEntry = {
      total: amount.total,
      date: new Date(),
    }
    console.log(newAmountEntry)
    if (!investedProject) {

      await User_Investing_Projects.create({
        projectId,
        userId,
        // TODO actualizar amount a amount history de tipo array de numbers a array de objetos
        amount: [newAmountEntry],
        totalAmount: amount.total,
      })
    } else {
      await User_Investing_Projects.update(
        {
          amount: [...investedProject.amount, newAmountEntry],
          totalAmount: investedProject.totalAmount + amount.total,
        },
        { where: { projectId, userId } }
      )
    }

    return true
  } catch (error) {
    console.log('Error at `investOnProject` controller ' + error.message)
    throw new Error(error)
  }
}

const toggleTaskToFavoriteProjects = async (userId, projectId) => {
  try {
      let user = await User.findOne({
          where: { id: userId },
          attributes: { exclude: ['password', 'salt'] },
          include: {
              model: db.Project,
              as: 'favoriteProjects',
          },
      });

      let currentFavList = (user.favoriteProjects || []).map(
          (item) => item.id
      );
      let existed = currentFavList.includes(projectId);
      let isAdded = false;

      if (!existed) {
          const project = await db.Project.findOne({
              where: { id: projectId },
          });

          if (!project) {
              throw new Error('Project not found');
          }
          await db.User_Favorites_Projects.create({userId, projectId})
          
          isAdded = true;
      } else {
        console.log('hi')
          await db.User_Favorites_Projects.destroy({
            where: {userId, projectId}
          })
      }

      const projects = await db.Project.findAll({
          where: { id: currentFavList },
      });
      
      user.favoritesCharacters = projects;

      return { user, isAdded };
  } catch (error) {
      console.log('Error in toggleTaskToFavoriteCharacter', error.message);
  }
};

module.exports = {
  getUsers,
  getUserByEmail,
  getUserById,
  updateUser,
  investOnProject,
  toggleTaskToFavoriteProjects
}
