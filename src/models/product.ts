import mongoose from "mongoose";

export type ProductType = {
  type: string,
  category: string,
  subCategorys: {
    name: string,
    introduce: {
      introduce: string,
      img: string
    }[]
  }[]
}

const ProductSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subCategorys: [{
    name: {
      type: String,
      required: true
    },
    pairs: [{
      introduce: {
        type: String,
        required: true
      },
      img: {
        type: String,
        required: true
      }
    }]
  }]
});

const ProductModel = mongoose.model("Product", ProductSchema);

export default ProductModel;
