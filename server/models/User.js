const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		address:{
			type: String,
		},
		cars: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "car",
			},
		]
    }
);

module.exports = mongoose.model("user", userSchema);