const mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	bcrypt = require("bcrypt"),
	SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			lowercase: true,
			required: [true, "can't be blank"],
			match: [/\S+@\S+\.\S+/, "is invalid"],
			index: { unique: true },
			unique: true
		},
		firstName: String,
		lastName: String,
		password: { type: String, required: true },
		ENABLE_SMTP: Boolean,
		SMTP_HOST: String,
		SMTP_PORT: String,
		SMTP_EMAIL: String,
		SMTP_PASSWORD: String,
		ENABLE_SLACK: Boolean,
		SLACK_WEBHOOK_URL: String,
		ENABLE_WEBHOOK: Boolean,
		CUSTOM_WEBHOOK_URL: String,
	},
	{ timestamps: true }
);

UserSchema.pre("save", function (next) {
	var user = this;

	if (!user.isModified("password")) return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
