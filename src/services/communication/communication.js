const nodemailer = require("nodemailer");
const slackNotify = require("slack-notify");

class Communication {
  /**
   *
   * @param {String} from - Email from address.
   * @param {String} to  - Email to address.
   * @param {String} subject - Email subject.
   * @param {String} html - Email body html.
   */
  sendMail(from, to, subject, html) {
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      html: html,
    };

    try {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          // TODO: Add better error handling.
          // Possible solution: https://www.npmjs.com/package/winston
          return console.log(error);
        }

        console.log(`Message sent: ${info.messageId}`);
      });
    } catch (e) {
      console.log(e);
    }
  }
  
  sendSms() {}
  sendTwitter() {}

  /**
   *
   * @param {String} slack_webhook_url - webhook from the app that will forward message.
   * @param {String} message - Message to send to slack server.
   */
  sendSlack(slack_webhook_url, message) {
    const slack = slackNotify(slack_webhook_url);

    slack
      .send(message)
      .then(() => {
        console.log("done!");
      })
      .catch(err => {
        console.error(err);
      });
  }

  sendDiscord() {}
  sendTelegram() {}
  sendMattermost() {}
}

module.exports = Communication;
