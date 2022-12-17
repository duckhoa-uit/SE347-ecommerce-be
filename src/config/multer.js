const multer = require('multer');
const path = require('path');

const acceptedExt = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];
// Multer config
module.exports = multer({
	storage: multer.diskStorage({}),
	fileFilter: (req, file, cb) => {
		let ext = path.extname(file.originalname).toLocaleLowerCase();
		if (!acceptedExt.includes(ext)) {
			cb(new Error('File type is not supported'), false);
			return;
		}
		cb(null, true);
	},
	filename: function (req, file, cb) {
		const timeStamp = Date.now();
		cb(
			null,
			file.originalname.toLowerCase().split(' ').join('-') +
				'-' +
				timeStamp +
				'.' +
				file.originalname.split('.')[file.originalname.split('.').length - 1]
		);
	},
});
