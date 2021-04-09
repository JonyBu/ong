const db = require('../models');
const Testimony = require('../models/testimony')(db.sequelize, db.Sequelize);
const { uploadImage } = require('../utils/AWS/aws');

const createTestimony = async (req) => {

	await uploadImage(req, 'testimonials', 'image')

	const testimonyCreated = await Testimony.create(req.body);

	return { testimony: testimonyCreated };
};

const getAllTestimonials = async (req) => {
	const testimonials = await Testimony.findAll();

	return { testimonials };
};

const updateTestimony = async (req) => {
	const { id: idReceived } = req.params;

	await uploadImage(req, 'testimonials', 'image')

	const testimonyFromDB = await Testimony.findOne({ where: { id: idReceived } });

	if (!testimonyFromDB) throw new Error(`El testimonio con id: ${idReceived} no existe`);

	await Testimony.update(req.body, { where: { id: idReceived } });

	const testimonyUpdated = await Testimony.findOne({ where: { id: idReceived } });

	return { testimony: testimonyUpdated };
};

const deleteTestimony = async (req) => {
	const { id: idReceived } = req.params;

	const testimonyFromDB = await Testimony.findOne({ where: { id: idReceived } });

	if (!testimonyFromDB) throw new Error(`El testimonio con id: ${idReceived} no existe`);

	await Testimony.destroy({ where: { id: idReceived } });

	return { message: `El testimonio con id: ${idReceived} fue removido con éxito` };
};

module.exports = {
  getAllTestimonials,
  createTestimony,
	updateTestimony,
	deleteTestimony,
};
