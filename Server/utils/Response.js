const chalk = require('chalk');

class Response {
	static success(res, data = {}, status = 200) {
		return res.status(status).send({
			ok: true,
			status,
			data,
		});
	}

	static error(res, err, message = 'Internal server error.', status = 500) {
		if (err) {
			if (err instanceof Object || Array.isArray(err)) {
				console.log(err);
			} else {
				console.log(chalk.red(`[Response Error]: ${err}`));
			}
		}

		return res.status(status).send({
			ok: false,
			status,
			data: { message },
		});
	}
}

module.exports = Response;
