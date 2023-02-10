const cloudinary = require('../config/cloudinary');

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

class MediaController {
  uploadFiles = async (req, res) => {
    try {
      const promises = req.files.map((file) =>
        cloudinary.uploader.upload(file.path, {
          timeout: 120000,
          // responsive_breakpoints: {
          //   create_derived: true,
          //   bytes_step: 100000,
          //   min_width: 400,
          //   max_width: 1200,
          //   transformation: {
          //     gravity: 'auto',
          //   },
          // },
        })
      );
      const uploadedImages = await Promise.all(promises);

      // const blurhashImagesPromises = req.files.map((file) => blurhashEncode(file.path));
      // const blurhashImages = await Promise.all(blurhashImagesPromises);

      // const transformedImages = uploadedImages.map((img, index) => {
      //   return {
      //     ...img,
      //     responsive_breakpoints:
      //       img.responsive_breakpoints.length > 0 ? img.responsive_breakpoints[0].breakpoints : [],
      //     blurhash: blurhashImages[index],
      //     ordinal: index + 1,
      //   };
      // });

      return res.json({
        data: uploadedImages,
        errorCode: 0,
        message: 'Upload files successfully',
      });
    } catch (error) {
      console.log(
        '🚀 ~ file: MediaController.js:47 ~ MediaController ~ uploadFiles= ~ error',
        error
      );
      return res.json({
        data: undefined,
        errorCode: 500,
        message: error,
      });
    }
  };
}

module.exports = new MediaController();
