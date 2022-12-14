const cloudinary = require('cloudinary').v2;

const image = cloudinary.url('<Your Public ID>', {
	sign_url: true,
	secure: true,
	custom_function: {
		function_type: 'remote',
		source: '<Netlify Function Endpoint>',
	},
});

console.log(image);
