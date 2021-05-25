const db = require('../models')
const Organization = require('../models/organization')(db.sequelize, db.Sequelize)
const Slides = require('../models/slides')(db.sequelize, db.Sequelize)

const { uploadMultipleImages } = require('../utils/AWS/aws');

const getOrganizationData = async () => {
  const attributes = ['name', 'image', 'phone', 'address', 'welcomeText', 'id', 'description']
  const include = [
    {
      model: db.SocialNetwork,
      as: 'socialNetworks',
      attributes: ['name', 'url']
    },
    {
      model: db.Slides,
      as: 'slidesData',
      attributes: ['imageUrl', 'text', 'order']
    }
  ]
 
  const data = await db.Organization.findAll({ attributes, include })
  
  if (data.length === 0) throw new Error('No se ha encontrado ninguna organización.')

  return { organization: data[0] }
}

const updateOrganization = async (req) => {

  const { id: idReceived } = req.params;   
  
  const sliderPics = ['sliderPic1', 'sliderPic2', 'sliderPic3'];

  await uploadMultipleImages(req, 'organization', sliderPics);  

	const OrganizationFromDB =  await db.Organization.findOne({ where: { id: idReceived }});
  
  const SlidersFromDB = await Slides.findAll({ where: { organizationId: idReceived }});
  
  if (!SlidersFromDB)  throw new Error('No se pudieron recabar todos los datos, Inténtelo de nuevo más tarde');
    
  sliderPics.forEach( async (s, i) => {
    await Slides.update({ 
      imageUrl: req.body[s], 
      text: req.body[`sliderText${i + 1}`] 
    }, { 
      where: {
        organizationId: idReceived,
        order: i + 1
      }
    });
  });  
  
	if (!OrganizationFromDB) throw new Error(`La organización con id: ${idReceived} no existe`);

	await Organization.update(req.body, { where: { id: idReceived } });

	const OrganizationUpdated = await Organization.findOne({ where: { id: idReceived } });

	return { organization: OrganizationUpdated };
};

module.exports = {
  getOrganizationData,
  updateOrganization
}