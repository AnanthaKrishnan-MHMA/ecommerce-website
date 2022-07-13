const nodeMailer = require('nodemailer');

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        host:process.env.SMPT_HOST,
        port:process.env.SMPT_PORT,
        service: process.env.ADMIN_EMAIL_SERVICE,
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_EMAIL_PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    }
    await transporter.sendMail(mailOptions);
    
}
module.exports = sendEmail;