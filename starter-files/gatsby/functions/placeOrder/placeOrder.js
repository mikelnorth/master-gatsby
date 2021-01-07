const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');

const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY,
  })
);

exports.handler = async (event, context) => {
  const info = await transport.sendMail({
    from: 'Slicks Slices <slick@example.com>',
    to: 'mikel.north@gmail.com',
    subject: 'New Order!',
    html: `<h1>New Order!</h1>`,
  });
  console.log('key', process.env.SENDGRID_API_KEY);
  console.log('info', info);
  return { statusCode: 200, body: 'hello' };
};
