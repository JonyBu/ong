module.exports = {
	handlerNotFound: require('./404NotFound'),
	bodyValidator: require('./bodyValidator'),
	authenticateJWT: require('./authenticateJWT'),
	isAdmin: require('./isAdmin'),
	requestValidator: require('./requestValidator'),
	unless: require('./unless')
};
