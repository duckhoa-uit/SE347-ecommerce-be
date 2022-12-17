const { encode, decode } = require('blurhash');
const sharp = require('sharp');

const blurhashEncode = async (file) => {
	try {
		const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({
			resolveWithObject: true,
		});
		const encoded = encode(new Uint8ClampedArray(data), info.width, info.height, 4, 4);
		const decoded = decode(encoded, info.width, info.height);
		const image = await sharp(Buffer.from(decoded), {
			raw: {
				channels: 4,
				width: info.width,
				height: info.height,
			},
		})
			.jpeg({
				overshootDeringing: true,
				quality: 40,
			})
			.toBuffer();

		return image.toString('base64');
	} catch (error) {
		console.log(error);
	}
};
module.exports = { blurhashEncode };
