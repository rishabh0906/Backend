const nodemailer = require("nodemailer");
const { AdminPassword, AdminId, SecondPersonId } = require("../config");

async function sendTokenMail(email,token) {
  const transport = await nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: AdminId,
      pass: AdminPassword,
    },
  });

  try {
    let res = await transport.sendMail({
      from: `Test App <${AdminId}>`,
      to: SecondPersonId,
      subject: "Reset token",
      text: `${token}`,
    });
    console.log("response:" + res.messageId);
  } catch (err) {
    console.log(err);
  }
}

module.exports = sendTokenMail;
