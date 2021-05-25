const { Response } = require('../utils');

const requestValidator = (req, res, next) => {

    if(req.params.id == req.user.id || req.user.roleId == 1) {
        next();
    }else{
        return Response.error(res, '403 Forbidden', 'Forbidden', 403);
    }
};

module.exports = requestValidator;