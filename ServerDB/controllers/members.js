const db = require('../models');
const Members = require('../models/members')(db.sequelize, db.Sequelize); 
const { uploadImage } = require('../utils/AWS/aws');

const createMember = async (req) => {

  await uploadImage(req, 'members', 'image');
  
  const memberDB = await Members.create( req.body );
  
  return { member: memberDB };
};

const getAllMembers = async () => {
  const attributes = ['id', 'name', 'image'];
  const members = await Members.findAll({ attributes });

  return { members };
}

const updateMember = async (req) => {
  const { id } = req.params;

  await uploadImage(req, 'members', 'image');

  const existsMember = await Members.findOne({ where: { id } });
  
  if (!existsMember) throw new Error(`Miembro con id ${id} no encontrado.`);
  
  // delete id if exists in body
  delete req.body.id;

  const updatedMember = await Members.update(req.body, { where: { id } });
  
  const attributes = ['id', 'name', 'image'];
  const memberUpdated = await Members.findOne({ where: { id }, attributes });
  
  return { member: memberUpdated };
}

const deleteMember = async (req) => {
  const { id } = req.params;
  const existsMember = await Members.findOne({ where: { id } });

  if (!existsMember) throw new Error(`Miembro con id ${id} no encontrado`);

  const deletedMember = await Members.destroy({ where: { id } });

  return { message: `Miembro con id ${id} eliminado exitosamente` };
}

module.exports = {
  getAllMembers,
  createMember,
  updateMember,
  deleteMember,
};
