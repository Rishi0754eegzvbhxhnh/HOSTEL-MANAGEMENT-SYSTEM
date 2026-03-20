const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    try {
        // Create a transporter using ethereal or real SMTP transport
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: process.env.EMAIL_PORT || 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Setup email data with unicode symbols
        const mailOptions = {
            from: `HostelPro System <${process.env.EMAIL_USER}>`,
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.htmlMessage || `<p>${options.message}</p>`,
        };

        // Send mail with defined transport object
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent: ${info.messageId}`);
        return true;
    } catch (error) {
        console.error(`❌ Error sending email: ${error.message}`);
        return false;
    }
};

module.exports = sendEmail;
