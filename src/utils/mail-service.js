const nodemailer = require('nodemailer');
let AWS = require('aws-sdk');

const transporter = nodemailer.createTransport({
  SES: new AWS.SES({
    accessKeyId: process.env.SES_ACCESS_KEY,
    secretAccessKey: process.env.SES_SECRET_KEY,
    region: process.env.REGION,
    apiVersion: '2010-12-01',
    
  }),
});

const sendMail = async (toEmail, subject, body, html, attachments) => {
  const info = await transporter.sendMail({
    from: process.env.CC_FROM_EMAIL,
    to: toEmail,
    subject: subject,
    text: body,
    html: html || '<>',
    attachments,
  });

  console.log('Message sent: ', info.messageId);
};

module.exports = {
  sendMail,
};
