const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    rating: {
      type: Number,
      required: true,
      validate: [
        {
          validator: Number.isInteger,
          message: '{VALUE} is not an integer value',
        },
        // {
        //   validator: Number.isInteger,
        //   message: '{VALUE} is not an integer value',
        // },
      ],
    },
    message: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', ReviewSchema);
