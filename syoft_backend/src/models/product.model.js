const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    name: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    inventory_count: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Product = mongoose.model('product', productSchema);

module.exports = Product;
