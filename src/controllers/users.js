const db = require('../models')
const User = db.User

const getUsers = async () => {
  try {
    const users = await User.findAll();
    if(!users){
      throw new Error('No users found in controller');
    }
    return users;
  } catch (error) {
    console.log('Error at `getUsers controller` ' + error.message);
  }
  
}
const getUserById = async (id) => {
  try {
    if(!id){
      throw new Error('id not specified at getUserById controller')
    }
    const user = await User.findOne({where: {id}});
    if(!user){
      throw new Error('User not found in controller `getUserById`');
    }
    return user
  } catch (error) {
    console.log('Error at `getUserById controller` ' + error.message);
  }
}
const updateUser = async (id, newData) => {
  try {
    if(!id || !newData){
      throw new Error('id or newData not specified at updateUser controller')
    }
    const user = await User.findOne({where: {id}});
    if(!user){
      throw new Error('User not found');
    }
    const updatedUser = await User.update(newData, {where: {id}});
    if(!updatedUser){
      throw new Error('User could not be updated at updateUser controller');
    }
    return updatedUser;
  } catch (error) {
    console.log('Error at `updateUser` controller ' + error.message);
  }
}
const deleteUser = async (id) => {
  try {
    if(!id){
      throw new Error('id not specified at deleteUser controller')
    }
    const user = await User.findOne({where: {id}});
    if(!user){
      throw new Error('User not found');
    }
    const deleted = await User.destroy({where: {id}});
    if(!deleted){
      throw new Error('User could not be deleted at deleteUser controller');
    }
    return true;
  } catch (error) {
    console.log('Error at `deleteUser` controller ' + error.message);
  }
}
const getUserByEmail = async (email) => {
  try {
    if(!email) {
      throw new Error('Email not specified at getUserByEmail controller');
    }
    const user = await User.findOne({ where: { email: email } })
    if(!user) {
      throw new Error('User not found at getUserByEmail controller');
    }
    return user
  } catch (error) {
    console.log('Error at `getUserByEmail` controller ' + error.message)
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
// }

module.exports = {
  getUsers,
  getUserByEmail,
  getUserById,
  updateUser,
  deleteUser
}
