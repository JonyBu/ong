const bcrypt = require('bcryptjs');

const db = require('../models');
const User = require('../models/user')(db.sequelize, db.Sequelize);
const { generateJWT , emailSender } = require('../utils');

const createUser = async (req) => {
	const { email, password } = req.body;

  const userFromDB = await User.findOne({
    where: { email },
  });

	if (userFromDB) throw new Error('El email no es válido o ya está en uso.');

	const salt = bcrypt.genSaltSync(10);

	const newUser = {
		...req.body,
		password: bcrypt.hashSync(password, salt),
	};

	const userCreated = await User.create(newUser);
	const token = generateJWT(userCreated);

  delete userCreated.dataValues.password;

  emailSender.sendEmail('user-register', userCreated );

	return { user: userCreated, token };
};

const loginUser = async (req) => {
	// check if the email is registered 
	const email = req.body.email;
	const user = await User.findOne({
    where: { email },
	});
  
  if (!user) throw new Error("Mail o contraseña incorrectos");
  
	// check encrypted password with password sent on request
	const password = req.body.password;
	if (!bcrypt.compareSync(password, user.password))
	  throw new Error("Mail o contraseña incorrectos");

  delete user.dataValues.password;
	// create token
	const token = generateJWT(user);

  emailSender.sendEmail('user-login', user);
  
	return { user , token };
};

const getMe = async (req) => {
	const { id, firstName, lastName, email, roleId, organizarionId, image } = req.user
	return { user: { id, firstName, lastName, email, roleId, organizarionId, image } };
}

module.exports = {
	createUser,
	loginUser,
	getMe,
};
