const db = require('../models');
const Activity = require('../models/activity')(db.sequelize, db.Sequelize);
const { uploadImage } = require('../utils/AWS/aws');

const createActivity = async (req) => {

    await uploadImage(req, 'activities', 'image');    

    const newActivity = req.body;

    const activityCreated = await Activity.create(newActivity);

    return { activity: activityCreated };
}

const getActivityDetails = async (req) => {
    const idReceived = req.params.id;
    const activity = await Activity.findOne({ where: { id: idReceived } });

    if (!activity) throw new Error(`La Entrada del tipo Novedad con id: ${idReceived} no existe`);
    return { activity: activity };
}

const getAllActivities = async () => {
    return { activities: await Activity.findAll() };
}

const updateActivity = async (req) => {

    await uploadImage(req, 'activities', 'image');  

    const activityFromDB = await Activity.findOne({ where: { id: req.params.id } });

    if (!activityFromDB) throw new Error('no existe una Actividad registrada con ese Id ');

    await Activity.update(req.body, { where: { id: req.params.id } });

    const updatedActivity = await Activity.findOne({ where: { id: req.params.id } });

    return { activity: updatedActivity }
}

const deleteActivity = async (req) => {
    const { id: idReceived } = req.params;

    const activityFromDB = await Activity.findOne({ where: { id: idReceived } });

    if (!activityFromDB) throw new Error(`La actividad con id: ${idReceived} no existe`);

    await activityFromDB.destroy({ where: { id: idReceived } });

    return { message: `La actividad con id: ${idReceived} fue removido con éxito` };
};


module.exports = {
    createActivity,
    getAllActivities,
    updateActivity,
    deleteActivity,
    getActivityDetails
};