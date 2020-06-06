const mailer = require('nodemailer');

const transport = mailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: 'ridam.chatdev@gmail.com',
    pass: 'ebyyddalmtajthtn',
  }
});

module.exports = {
  transport,
}
