import nodemailer from 'nodemailer';
import { responseMailTemplates, sendMailTemplates } from '../templates/templates.js';
import dotenv from 'dotenv';
dotenv.config()


const sendMail = async (json, type) => {
    try {
        const html_content = await sendMailTemplates(json, type);
        const res_content = await responseMailTemplates(json, type)
        const transporter = nodemailer.createTransport({
            service: 'gmail', // or your email service provider
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        let mailOptionsToRecipient = { //MAIL GO TO ADMIN 
            from: json.email,
            to: json.adminEmail,
            subject: type === 1 ? json.subject : "New Project Enquiry",
            html: html_content
        };

        let mailOptionsToResponse = { //MAIL RESPOSNE TO USER 
            from: json.adminEmail,
            to: json.email,
            subject: type === 1 ? json.subject : "Project quotation enquiry.",
            html: res_content
        };
        transporter.sendMail(mailOptionsToRecipient, (error, info) => {
            if (error) {
                return error
            } else {
                return true
            }
        })

        transporter.sendMail(mailOptionsToResponse, (error, info) => {
            if (error) {
                return error
            } else {
                return true
            }
        })


        return true

    } catch (error) {
        return error
    }


}

const cvMail = async (json) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // or your email service provider
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        let mailOptionsToRecipient = { //MAIL GO TO ADMIN 
            from: "",
            to: json.adminEmail,
            subject: `Application Received for ${json.jobrole}`,
            html: `
       <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="email-container">
        <p>Dear <span class="placeholder">Aditi</span>,</p>
        <p>I hope this email finds you well.</p>
        <p>I am writing to inform you that we have received an application for the position of <span class="placeholder">${json.jobrole}</span>. Below are the details of the candidate:</p>
        <p>Please find the candidate's CV attached for your review.</p>
        <p>Thank you for your attention to this matter.</p>
        <p>Best regards,</p>
        <p class="signature">Delostyle Studio Private Limited</p>
        <p><a href="https://www.delostylestudio.com">www.delostylestudio.com</a></p>
    </div>
</body>
</html>
                `,
            attachments: [
                {
                    filename: json.originalname,
                    content: json.buffer,
                },
            ],
        };


        transporter.sendMail(mailOptionsToRecipient, (error, info) => {
            if (error) {
                return error
            } else {
                return true
            }
        })


        return true

    } catch (error) {
        return error
    }
}

export { sendMail, cvMail }
