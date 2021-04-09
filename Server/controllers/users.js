const db = require('../models');
const Users = require('../models/user')(db.sequelize, db.Sequelize); 
const { uploadImage } = require('../utils/AWS/aws');

const getAllUsers = async () => {
  
  const usersFromDB = await Users.findAll({    
      attributes: {
        exclude:["password"]
      }
  });

  return { users: usersFromDB };
}

const updateUser = async (req) => {

  const { id } = req.params;

  await uploadImage(req, 'users', 'image');  

  const userFromDB = await Users.findOne({ where: { id } });
  if(!userFromDB) { throw new Error ("El usuario no existe") }

  await Users.update(req.body, { where: { id } });   

  const updatedUser = await Users.findOne({ where: { id } });
  
  return { user: updatedUser };
}


const deleteUser = async (req) => {
  const { id } = req.params;

  const existsUser = await Users.findOne({ where: { id } });

  if (!existsUser) throw new Error(`Usuario con id ${id} no encontrado.`);

  const deletedUser = await Users.destroy({ where: { id } });

  return { message: `Usuario con id ${id} eliminado exitosamente.` };
}


module.exports = {
  deleteUser,
  getAllUsers,
  updateUser
};
