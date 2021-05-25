// https://alkemy-ong.s3.sa-east-1.amazonaws.com (base path)
const { client: clientS3, BASE_URL, getObjectParams } = require('./config');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const Response = require('../Response');

const { v4: uuidv4 } = require('uuid');
const path = require('path');

const generateUuidKey = (fileType, folder) => `kingcode16/${folder}/${uuidv4()}${fileType}`;

const uploadImageS3 = async (req, folder) => {
	try {
		if (req.file) {
			const { originalname, buffer } = req.file;
			const fileType = path.extname(originalname);

			const key = generateUuidKey(fileType, folder);
			const body = buffer;

			const uploadParams = getObjectParams({ key, body });
			const command = new PutObjectCommand(uploadParams);

			await clientS3.send(command);

			return `${BASE_URL}${uploadParams.Key}`;
		}
	} catch (error) {
		Response.error(error);
	}
};

/* SAME FUNCTION AS BEFORE BUT WITHOYT REQ.FILE, JUST BUFFER*/

const uploadOneImageS3 = async (originalname, buffer , folder) => {
	try {	
		const fileType = path.extname(originalname);

		const key = generateUuidKey(fileType, folder);
		const body = buffer;

		const uploadParams = getObjectParams({ key, body });
		const command = new PutObjectCommand(uploadParams);

		await clientS3.send(command);

		return `${BASE_URL}${uploadParams.Key}`;
		
	} catch (error) {
		Response.error(error);
	}
};

/* 
	WARNING: uploadImage function works with a MUTABLE object (req),
  then the order of use it's important 
*/
const uploadImage = async (req, folder, field) => {

	if ( !req.body[field] ) {
		delete req.body[field]
	}
	
	if ( req.file ) {
			const imageURL =  uploadImageS3(req, folder);        
			req.body[field] = imageURL;
	}
}

const uploadMultipleImages = async (req, folder, fields) => {

	if ( fields.length > 0) {
		for ( let field in req.body ){
			if (fields.includes(field)) {
				delete req.body[field]
			}
		}
	}
	
	if ( req.files ) {
		for ( let file in req.files) {				
			const { originalname, buffer } = req.files[file][0];
			const imageURL = uploadOneImageS3(originalname, buffer, folder);			
			req.body[file] = imageURL;
		}
	}

}

module.exports = {
	uploadImageS3,
	uploadImage,
	uploadMultipleImages
};
