const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema(
	{
		public_id: { type: String, required: true },
		asset_id: { type: String, required: true },
		bytes: { type: Number, required: true },
		format: { type: String, required: true },
		resource_type: { type: String, required: true },
		width: { type: Number, required: true },
		height: { type: Number, required: true },
		original_filename: { type: String, required: true },
		created_at: { type: String, required: true },
		url: { type: String, required: true },
		secure_url: { type: String, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Cart', MediaSchema);
// {
// 	"asset_id": "4bf7ba7aa683124f54a4ef6675944e1d",
// 	"public_id": "dbjjzuyb36igyvenlrcq",
// 	"version": 1671218171,
// 	"version_id": "0ab215fd58e1f6e0bacf131c8f893396",
// 	"signature": "e20f3d4050da9928fca1c96edad0f15708815abf",
// 	"width": 1900,
// 	"height": 688,
// 	"format": "jpg",
// 	"resource_type": "image",
// 	"created_at": "2022-12-16T19:16:11Z",
// 	"tags": [],
// 	"bytes": 314044,
// 	"type": "upload",
// 	"etag": "3ba6bd4308333e455e50103de4000e6a",
// 	"placeholder": false,
// 	"url": "http://res.cloudinary.com/dcj2pwpxy/image/upload/v1671218171/dbjjzuyb36igyvenlrcq.jpg",
// 	"secure_url": "https://res.cloudinary.com/dcj2pwpxy/image/upload/v1671218171/dbjjzuyb36igyvenlrcq.jpg",
// 	"folder": "",
// 	"original_filename": "e258dddd2062d9f219c8e3f0e7b96827",
// 	"responsive_breakpoints": [
// 			{
// 					"breakpoints": [
// 							{
// 									"width": 1000,
// 									"height": 563,
// 									"bytes": 61023,
// 									"url": "http://res.cloudinary.com/dcj2pwpxy/image/upload/ar_16:9,c_fill,g_auto/c_scale,w_1000/v1671218171/dbjjzuyb36igyvenlrcq.jpg",
// 									"secure_url": "https://res.cloudinary.com/dcj2pwpxy/image/upload/ar_16:9,c_fill,g_auto/c_scale,w_1000/v1671218171/dbjjzuyb36igyvenlrcq.jpg"
// 							},
// 							{
// 									"width": 874,
// 									"height": 492,
// 									"bytes": 49672,
// 									"url": "http://res.cloudinary.com/dcj2pwpxy/image/upload/ar_16:9,c_fill,g_auto/c_scale,w_874/v1671218171/dbjjzuyb36igyvenlrcq.jpg",
// 									"secure_url": "https://res.cloudinary.com/dcj2pwpxy/image/upload/ar_16:9,c_fill,g_auto/c_scale,w_874/v1671218171/dbjjzuyb36igyvenlrcq.jpg"
// 							},
// 							{
// 									"width": 502,
// 									"height": 283,
// 									"bytes": 28898,
// 									"url": "http://res.cloudinary.com/dcj2pwpxy/image/upload/ar_16:9,c_fill,g_auto/c_scale,w_502/v1671218171/dbjjzuyb36igyvenlrcq.jpg",
// 									"secure_url": "https://res.cloudinary.com/dcj2pwpxy/image/upload/ar_16:9,c_fill,g_auto/c_scale,w_502/v1671218171/dbjjzuyb36igyvenlrcq.jpg"
// 							},
// 							{
// 									"width": 200,
// 									"height": 113,
// 									"bytes": 9966,
// 									"url": "http://res.cloudinary.com/dcj2pwpxy/image/upload/ar_16:9,c_fill,g_auto/c_scale,w_200/v1671218171/dbjjzuyb36igyvenlrcq.jpg",
// 									"secure_url": "https://res.cloudinary.com/dcj2pwpxy/image/upload/ar_16:9,c_fill,g_auto/c_scale,w_200/v1671218171/dbjjzuyb36igyvenlrcq.jpg"
// 							}
// 					],
// 					"transformation": "ar_16:9,c_fill,g_auto"
// 			}
// 	],
// 	"api_key": "977742739239461"
// }
