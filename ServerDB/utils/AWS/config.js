const { S3Client } = require('@aws-sdk/client-s3');
const { AWS } = require('../../config');

const client = new S3Client({
	region: AWS.AWS_REGION,
	credentials: {
		accessKeyId: AWS.AWS_ACCESS_KEY_ID,
		secretAccessKey: AWS.AWS_SECRET_ACCESS_KEY,
	},
});

const BASE_URL = AWS.AWS_BASE_URL;

/**
 * @param {string} key Name of the file (including the extension)
 * @param {Buffer} body Buffer of the file
 * @returns
 */
const getObjectParams = ({ key = null, body = null }) => {
	const bucketParams = { Bucket: AWS.AWS_BUCKET_NAME };

	if (key && body)
		return {
			...bucketParams,
			Key: key,
			Body: body,
		};

	if (key)
		return {
			...bucketParams,
			Key: key,
		};

	return bucketParams;
};

module.exports = { client, BASE_URL, getObjectParams };
