const nodemailer = require("nodemailer");



module.exports = sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.HOST_EMAIL,
            pass: process.env.HOST_PASSWORD
        },
    });

    const mailOptions = {
        from: process.env.HOST_USER_EMAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await transporter.sendMail(mailOptions);

};