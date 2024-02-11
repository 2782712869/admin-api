import mongoose from "mongoose";

export type GoodsType = {
  category: string;
  subCategory: {
    name: string;
    goods: {
      img: string;
      title: string;
      desc: string;
    }[];
  }[];
};

const GoodsSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  subCategory: [
    {
      name: {
        type: String,
        required: true,
      },
      goods: [
        {
          img: {
            type: String,
            required: true,
          },
          title: {
            type: String,
            required: true,
          },
          desc: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});

const GoodsModel = mongoose.model("Goods", GoodsSchema);

export default GoodsModel;
