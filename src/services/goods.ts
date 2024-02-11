import GoodsModel from "@/models/goods";
import type { GoodsType } from "@/models/goods";

export const createGoods = async (goods: GoodsType) => {
  return (await new GoodsModel(goods).save()).toObject();
};

export const deleteGoods = async (id: string) => {
  return await GoodsModel.findByIdAndDelete(id);
};

export const updateGoods = async (
  id: string,
  values: Partial<GoodsType>
) => {
  return (
    await GoodsModel.findByIdAndUpdate(id, values, { new: true })
  )?.toObject();
};

export const findGoods = async (id: string) => {
  return (await GoodsModel.findById(id))?.toObject();
};

export const findAllGoods = async () => {
  return await GoodsModel.find();
};
