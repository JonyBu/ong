module.exports = {
	JWT: {
		SECRET: process.env.JWT_SECRET_KEY || 'SecretKeyT16',
	},
	AWS: {
		AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
		AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
		AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
		AWS_REGION: process.env.AWS_REGION,
		AWS_BASE_URL: process.env.AWS_BASE_URL,
	},
};
