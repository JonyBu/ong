const db = require('../models');
const Entry = require('../models/entry')(db.sequelize, db.Sequelize);
const { uploadImage } = require('../utils/AWS/aws');

const createEntryNews = async (req) => {
 
  await uploadImage(req, 'news', 'image');   

  const newEntryNews = {    
    ...req.body,
    type: "news",
    deletedAt: null
  }; 

  const entryNewFromDB = await Entry.create(newEntryNews);

  return { new: entryNewFromDB };
}

const newsDetail = async (req) => {
  const idReceived = req.params.id;
  const newsFromDB = await Entry.findOne({ where: { id: idReceived } });

  if (!newsFromDB) throw new Error(`La Entrada del tipo Novedad con id: ${idReceived} no existe`);

  return { news: newsFromDB };

}

const getAllNews = async () => {
  
  const news = await Entry.findAll({where: {type: 'news'}});

  return { news: news };
}

const updateEntryNews = async (req) => {

  const { id } = req.params;

  await uploadImage(req, 'news', 'image'); 

  const updatedDataEntryNews = {
    ...req.body,
    type: "news",
    deletedAt: null
  };
  
  const entry = await Entry.findAll({ where: { id } });
  if( entry.length <= 0 ) { throw new Error ("La entrada no existe. Incluye un id válido") }
  
  await Entry.update(updatedDataEntryNews, { where: { id } });   

  const updatedEntry = await Entry.findOne({ where: { id } });
  
  return { new: updatedEntry };
}

const deleteNew = async (req) => {
  const idReceived = req.params.id;
  const newFromDB = await Entry.findOne({ where: { id: idReceived } });

  if (!newFromDB) throw new Error(`La Entrada del tipo Novedad con id: ${idReceived} no existe`);

  await Entry.destroy({ where: { id: idReceived } });

  return { message: `La Entrada del tipo Novedad con id: ${idReceived} fue removida con exito` };
}

module.exports = {
  getAllNews,
  createEntryNews,
  updateEntryNews,
  deleteNew,
  newsDetail
};
