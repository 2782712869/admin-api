import { Request, Response } from "express";
import {
  createProduct,
  updateProduct,
  findProduct,
  findProductAll,
  deleteProduct,
} from "@/services/products";
import { singleFileUpload } from "@/utils";

/**
 * @api {post} /product 创建新产品
 * @apiName createProduct
 * @apiGroup Product
 * @apiVersion 0.0.1
 *
 * @apiDescription 创建新产品
 *
 * @apiHeader {String} Authorization Bearer <token>
 * @apiBody {Object} product 产品信息
 * @apiBody {String} product.type 产品类型
 * @apiBody {String} product.category 产品类别
 * @apiBody {Array} product.subCategorys 子分类数组
 * @apiBody {String} product.subCategorys.name 子分类名称
 * @apiBody {Array} product.subCategorys.introduce 子分类介绍数组
 * @apiBody {String} product.subCategorys.introduce.introduce 介绍
 * @apiBody {File} product.subCategorys.introduce.introduce.img 图片链接 (前端需以multipart/form-data方式上传)
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg 操作信息
 */
export const newProduct = [
  singleFileUpload("product.subCategorys.introduce.introduce.img"),
  async (req: Request, res: Response) => {
    try {
      const { product } = req.body;

      if (!product) {
        return res.status(400).json({
          code: 0,
          err: "参数不对",
        });
      }

      if (req.file) {
        // 通过 req.file 获取上传的图片信息
        const img = req.file.buffer.toString("base64");
        // 将图片信息添加到 product 对象中
        product.subCategorys.introduce.introduce.img = img;
      }

      await createProduct(product);

      res.status(201).json({
        code: 1,
        msg: "新增商品成功",
      });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({
        code: 0,
        err: "服务器内部错误",
      });
    }
  },
];

/**
 * @api {delete} /product/:id 删除产品
 * @apiName deleteProduct
 * @apiGroup Product
 * @apiVersion 0.0.1
 *
 * @apiDescription 根据产品ID删除产品
 *
 * @apiHeader {String} Authorization Bearer <token>
 * @apiParam {String} id 产品ID
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg 操作信息
 * @apiSuccess {Object} data 删除的产品信息
 */
export const deleteProductById = [
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const deletedProduct = await deleteProduct(id);

      if (!deletedProduct) {
        return res.status(404).json({
          code: 0,
          err: "未找到对应的商品",
        });
      }

      res.json({
        code: 1,
        msg: "删除商品成功",
        data: deletedProduct,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({
        code: 0,
        err: "服务器内部错误",
      });
    }
  },
];

/**
 * @api {patch} /product/:id 更新产品
 * @apiName updateProduct
 * @apiGroup Product
 * @apiVersion 0.0.1
 *
 * @apiDescription 根据产品ID更新产品信息
 *
 * @apiHeader {String} Authorization Bearer <token>
 * @apiParam {String} id 产品ID
 * @apiBody {Object} values 更新的值
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg 操作信息
 * @apiSuccess {Object} data 更新后的产品信息
 */
export const updateProductById = [
  singleFileUpload("values.subCategorys.introduce.introduce.img"),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { values } = req.body;

      if (!values) {
        return res.status(400).json({
          code: 0,
          err: "参数不对",
        });
      }

      // 如果请求中包含图片文件，则更新图片信息
      if (req.file) {
        const img = req.file.buffer.toString("base64");
        values.subCategorys.introduce.introduce.img = img;
      }

      const updatedProduct = await updateProduct(id, values);

      if (!updatedProduct) {
        return res.status(404).json({
          code: 0,
          err: "未找到对应的商品",
        });
      }

      res.json({
        code: 1,
        msg: "更新商品成功",
        data: updatedProduct,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({
        code: 0,
        err: "服务器内部错误",
      });
    }
  },
];

/**
 * @api {get} /product/:id 获取单个产品
 * @apiName getProductById
 * @apiGroup Product
 * @apiVersion 0.0.1
 *
 * @apiDescription 根据产品ID获取单个产品信息
 *
 * @apiHeader {String} Authorization Bearer <token>
 * @apiParam {String} id 产品ID
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {Object} data 单个产品信息
 */
export async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const product = await findProduct(id);

    if (!product) {
      return res.status(404).json({
        code: 0,
        err: "未找到对应的商品",
      });
    }

    res.json({
      code: 1,
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      code: 0,
      err: "服务器内部错误",
    });
  }
}

/**
 * @api {get} /products 获取所有产品
 * @apiName getAllProducts
 * @apiGroup Product
 * @apiVersion 0.0.1
 *
 * @apiDescription 获取所有产品信息
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {Object} data 所有产品信息数组
 */
export async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await findProductAll();
    res.json({
      code: 1,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      code: 0,
      err: "服务器内部错误",
    });
  }
}
