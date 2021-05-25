const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransport({
	auth: { 
		api_key: process.env.API_KEY_SENDGRID
	}
}));


const sendEmail =  function (type, object ) {

    switch(type) {
        
        case "user-register" : 
            try{
                transporter.sendMail({
                    to: object.email,
                    from: 'ong.team16.test@gmail.com',
                    subject: `nuevo registro email: ${object.email} en ONG-16 project`,
                    html: `<h1>Tu registro se realizó con éxito, bienvenido: ${object.firstName} ${object.lastName} </h1>`
                });
            }catch(err){
                console.log(err);
            }
            break;
        
        case "user-login" : 

            try{
                transporter.sendMail({
                    to: object.email,
                    from: 'ong.team16.test@gmail.com',
                    subject: `inicio de sesión detectado email: ${object.email} en ONG-16 Project`,
                    html: `<h1>Inicio de sesión, bienvenido: ${object.firstName} ${object.lastName} </h1>`
                });
            }catch(err){
                console.log(err);
            }
            break;

    }

}

module.exports = { 
    sendEmail
}
