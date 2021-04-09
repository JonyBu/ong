const db = require('../models');
const Category = require('../models/category')(db.sequelize, db.Sequelize);

const createCategory = async (req) => {

    const { name, description='' } = req.body; 
    
    const categoryReceived = await Category.findOne({where: {name: name}});

    if (categoryReceived) throw new Error(`La categoria: ${name} ya existe`);

    const newCategory = {
        name: name, 
        description: description
    };   

    const categoryCreated = await Category.create(newCategory);  
    
    return { category: categoryCreated };
}


const getAllCategories = async () => {

  const categoriesFromDB = await Category.findAll();

  return { categories: categoriesFromDB };
}

const updateCategory = async (req) => {
  const idReceived = req.params.id;
  const { name } = req.body; 
  const categoryFromDB = await Category.findOne({where: {id: idReceived}});

  if (!categoryFromDB) throw new Error(`La Categoria con id: ${idReceived} no existe`);

  await Category.update({name: name},{where:{id: idReceived}});
  const categoryUpdated = await Category.findOne({where:{id: idReceived}});

  return { category: categoryUpdated }
}


const deleteCategory = async (req) => {
  const idReceived = req.params.id;
  const categoryFromDB = await Category.findOne({where: {id: idReceived}});

  if (!categoryFromDB) throw new Error(`La Categoria con id: ${idReceived} no existe`);
  
  await Category.destroy({where: {id:idReceived}});

  return { message: `La Categoria con id: ${idReceived} fue removida con exito` };
  
}


module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};