/**
 * Layout:
 * router.METHOD('/ROUTE', MIDDLEWARE (optional), controllerWithTryCatch({
 *    callback: CONTROLLER FUNCTION, (example: controller.createUser)
 *    statusSuccess: STATUS (IS GOOD),
 *    statusError: STATUS (IS BAD),
 * }));
 *
 *
 * Example:
 * const express = requiere('express');
 * const { controllerWithTryCatch } = requiere('../utils');
 * const { isAdmin } = requiere('../middlewares');
 * const { createUser } = requiere('../controllers');
 *
 * const exampleRouter = express.Router();
 *
 * exampleRouter.post('/register', isAdmin, controllerWithTryCatch({
 *    callback: createUser,
 *    statusSuccess: 201,
 *    statusError: 400,
 * }));
 *
 * // OTHER ROUTES
 *
 * module.exports = exampleRouter;
 *
 *
 */
