const db = require('../models')
const User = db.User
const Project = db.Project
const User_Investing_Projects = db.User_Investing_Projects

const getUsers = async () => {
  try {
    const users = await User.findAll();
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
const deleteUser = async (id) => {
  try {
    if (!id) {
      return 'id not specified at deleteUser controller';
    }
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return 'User not found';
    }
    const deleted = await User.destroy({ where: { id } })
    if (!deleted) {
      return 'User could not be deleted at deleteUser controller';
    }
    return true
  } catch (error) {
    console.log('Error at `deleteUser` controller ' + error.message)
  }
}
const getUserByEmail = async (email) => {
  try {
    if (!email) {
      return 'Email not specified at getUserByEmail controller';
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
      return 'user_id or project_id not specified at investOnProject controller';
    }
    if (amount <= 0) {
      return 'amount must be greater than 0';
    }
    const user = await User.findOne({ where: { id: userId } });
    const project = await Project.findOne({ where: { id: projectId } });
    if (!user) {
      return 'user not found';
    }
    if (!project) {
      return 'project not found';
    }
    if (project.minInvest > amount) {
      return 'amount must be greater than minInvest';
    }
    const newAmount = project.totalInvest + amount;
    if (newAmount < project.totalInvest) {
      return 'something went wrong in order to added a new amount';
    }
    const updatedProject = await Project.update(
      { totalInvest: newAmount },
      { where: { id: projectId } }
    );
    if (!updatedProject) {
      return 'could not update project';
    }
    
    let investedProject = await User_Investing_Projects.findOne({
      where: { projectId, userId },
    });
    if (!investedProject) {
      const newAmountArray = [amount];
      const newInvestedProject = await User_Investing_Projects.create({
        projectId,
        userId,
        amount: newAmountArray,
        totalAmount: amount,
      });
      if (!newInvestedProject) {
        return 'could not create a project invested';
      }
      investedProject = newInvestedProject;
    } else {
      const InvestedProjectAmount = investedProject.amount;
      InvestedProjectAmount.push(amount);
      await User_Investing_Projects.update(
        { amount: InvestedProjectAmount },
        { where: { projectId, userId } }
      );
      const sumAmountInvestedProject = InvestedProjectAmount.reduce(
        (acc, curr) => {
          return acc + curr
        }
      );
      if (investedProject.totalAmount > sumAmountInvestedProject) {
        return 'something went wrong in order to added a new amount at User_Investing_Projects';
      }
      const updateInvestedProject = await User_Investing_Projects.update(
        { totalAmount: sumAmountInvestedProject },
        { where: { projectId, userId } }
      );
      if (!updateInvestedProject) {
        return 'error at added amount of one project at investOnProject controller';
      }
    }

    return true
  } catch (error) {
    console.log('Error at `investOnProject` controller ' + error.message)
  }
}

// const getCharactersFavs = async (userId) => {
//   const user = await User.findOne({
//     where: { id: userId },
//   })

//   if (!user) {
//     throw new Error('User not found')
//   }

//   const userCharacters = await UserCharacters.findAll({
//     where: {
//       userId,
//       characterId,
//     },
// })

//   const charactersIds = userCharacters.map(
//     (usercharacter) => usercharacter.characterId
//   )
//   const characters = await Character.findAll({
//     where: { id: charactersIds },
//   })

//   return characters.map((character) => ({
//     ...character.dataValues,
//     isFav: true,
//   }))
// }

// const toggleCharacterToFav = async ({ userId, characterId }) => {
//   let user = await User.findOne({
//     where: { id: userId },
//     attributes: { exclude: ['password', 'salt'] },
//     include: {
//       model: db.Character,
//       as: 'favorites',
//     },
//   })

//   let currentFavList = (user.favorites || []).map((item) => item.id)
//   const existed = currentFavList.includes(characterId)
//   let isAdded = false

//   if (!existed) {
//     const character = await Character.findOne({
//       where: { id: characterId },
//     })

//     if (!character) {
//       throw new Error('Character not found')
//     }

//     await user.addFavorites(character)
//     user = await User.findOne({
//       where: { id: userId },
//       attributes: { exclude: ['password', 'salt'] },
//       include: {
//         model: db.Character,
//         as: 'favorites',
//       },
//     })

//     currentFavList = (user.favorites || []).map((item) => item.id)
//     isAdded = true
//   } else {
//     const newList = currentFavList.filter((item) => item !== characterId)
//     await user.setFavorites(newList)
//     user = await User.findOne({
//       where: { id: userId },
//       attributes: { exclude: ['password', 'salt'] },
//       include: {
//         model: db.Character,
//         as: 'favorites',
//       },
//     })

//     currentFavList = (user.favorites || []).map((item) => item.id)
//     isAdded = false
//   }

//   const characters = await Character.findAll({
//     where: { id: currentFavList },
//   })

//   user.favorites = characters

//   return { user, isAdded }

module.exports = {
  getUsers,
  getUserByEmail,
  getUserById,
  updateUser,
  deleteUser,
  investOnProject,
}
