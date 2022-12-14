const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema(
	{
		public_id: { type: String, required: true },
		width: { type: Number, required: true },
		height: { type: Number, required: true },
		format: { type: String, required: true },
		resource_type: { type: String, required: true },
		created_at: { type: String, required: true },
		bytes: { type: Number, required: true },
		url: { type: String, required: true },
		secure_url: { type: String, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Cart', MediaSchema);
