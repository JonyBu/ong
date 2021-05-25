const { Router } = require('express');
const authRouter = require('./auth');
const organizationRouter = require('./organization');
const membersRouter = require('./members');
const newsRouter = require('./news');
const categoriesRouter = require('./category');
const usersRouter = require('./users.js');
const contactsRouter = require('./contacts');
const testimoniesRouter = require('./testimony.js');
const activitiesRouter = require('./activity');

const router = Router();

// EXAMPLE ROUTER:
// const exampleRouter = require('./example');
// router.use('/examples', exampleRouter);
router.use('/auth', authRouter);
router.use('/organizations/1/public', organizationRouter);
router.use('/members', membersRouter);
router.use('/news', newsRouter);
router.use('/categories', categoriesRouter);
router.use('/users', usersRouter);
router.use('/contacts', contactsRouter);
router.use('/testimonials', testimoniesRouter);
router.use('/activities', activitiesRouter);

module.exports = router;
