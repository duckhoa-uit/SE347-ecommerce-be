const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const randomPopular = Math.floor(Math.random() * 1000);

const ProductSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		desc: { type: String, required: true },
		images: [
			{
				asset_id: { type: String, required: true },
				blurhash: { type: String, required: true },
				bytes: { type: Number, required: true },
				format: { type: String, required: true },
				height: { type: Number, required: true },
				original_filename: { type: String, required: true },
				public_id: { type: String, required: true },
				resource_type: { type: String, required: true },
				responsive_breakpoints: [
					{
						width: { type: Number, required: true },
						height: { type: Number, required: true },
						bytes: { type: Number, required: true },
						url: { type: String, required: true },
						secure_url: { type: String, required: true },
					},
				],
				secure_url: { type: String, required: true },
				url: { type: String, required: true },
				width: { type: Number, required: true },
			},
		],
		categories: { type: Array },
		size: { type: Array },
		color: { type: Array },
		price: { type: Number, required: true },
		quantity: { type: Number, default: 0 },
		countRating: { type: Number, default: 1 },
		rating: { type: String, default: '5.0' },
		popular: { type: Number, default: randomPopular },
		inStock: { type: Boolean, default: true },
		deleted: { type: Boolean, default: false },
		deletedAt: { type: Date, default: null },
	},
	{ timestamps: true }
);

ProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', ProductSchema);
