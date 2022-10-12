const nodeMailer = require("nodemailer");
const slackNotify = require("slack-notify");
var Mattermost = require("node-mattermost");

class Communication {
	/**
	 *
	 * @param {String} from - Email from address.
	 * @param {String} to  - Email to address.
	 * @param {String} subject - Email subject.
	 * @param {String} html - Email body html.
	 */
	sendMail(from, to, subject, html) {
		let transporter = nodeMailer.createTransport({
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

	/**
	 *
	 * @param {String} mattermost_webhook_url - mattermost hook.
	 * @param {String} message - message content.
	 * @param {String} channel - channel to which we are sending the message.
	 * @param {String} username - message sender username.
	 */
	sendMattermost(mattermost_webhook_url, message, channel, username) {
		const mattermost = new Mattermost(mattermost_webhook_url);
		mattermost.send({
			text: message,
			channel: channel,
			username: username,
		});
	}
}

module.exports = Communication;
