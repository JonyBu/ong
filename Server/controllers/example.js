/**
 *  const db = require('../models');
 *  const Example = require('../models/example')(db.sequelize, db.Sequelize); // Model
 *
 *  const createExample = async (req) => {
 *     const exampleFromDB = await Example.findAll();
 *
 *     if (exampleFromDB) throw new Error('Email is invalid or already taken.');
 *
 *     const example = await Example.create(req.body);
 *
 *     return { example };
 *  };
 *
 *  module.exports = {
 *    createExample,
 *  };
 *
 */
