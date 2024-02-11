import ProductModel from "@/models/product";
import type { ProductType } from "@/models/product";

export const createProduct = async (product: ProductType) => {
  return (await new ProductModel(product).save()).toObject();
};

export const deleteProduct = async (id: string) => {
  return await ProductModel.findByIdAndDelete(id);
};

export const updateProduct = async (
  id: string,
  values: Partial<ProductType>
) => {
  return (
    await ProductModel.findByIdAndUpdate(id, values, { new: true })
  )?.toObject();
};

export const findProduct = async (id: string) => {
  return (await ProductModel.findById(id))?.toObject();
};

export const findProductAll = async () => {
  return await ProductModel.find();
};
