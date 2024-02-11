import { Request, Response } from 'express';
import { createGoods, updateGoods, findGoods, findAllGoods, deleteGoods } from '@/services/goods';
import { singleFileUpload } from '@/utils';

/**
 * @api {post} /goods 创建新商品
 * @apiName createGoods
 * @apiGroup Goods
 * @apiVersion 0.0.1
 *
 * @apiDescription 创建新商品
 *
 * @apiHeader {String} Authorization Bearer <token>
 * @apiBody {Object} goods 商品信息
 * @apiBody {String} goods.category 商品类别
 * @apiBody {Array} goods.subCategory 子分类数组
 * @apiBody {String} goods.subCategory.name 子分类名称
 * @apiBody {Array} goods.subCategory.goods 商品数组
 * @apiBody {File} goods.subCategory.goods.img 商品图片 (前端需以multipart/form-data方式上传)
 * @apiBody {String} goods.subCategory.goods.title 商品标题
 * @apiBody {String} goods.subCategory.goods.desc 商品描述
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg 操作信息
 */
export const newGoods = [
  singleFileUpload('goods.subCategory.goods.img'),
  async (req: Request, res: Response) => {
    try {
      const { goods } = req.body;

      if (!goods) {
        return res.status(400).json({
          code: 0,
          err: '参数不对',
        });
      }

      if (req.file) {
        const img = req.file.buffer.toString('base64');
        goods.subCategory.goods.img = img;
      }

      await createGoods(goods);

      res.status(201).json({
        code: 1,
        msg: '新增商品成功',
      });
    } catch (error) {
      console.error('Error creating goods:', error);
      res.status(500).json({
        code: 0,
        err: '服务器内部错误',
      });
    }
  },
];

/**
 * @api {delete} /goods/:id 删除商品
 * @apiName deleteGoods
 * @apiGroup Goods
 * @apiVersion 0.0.1
 *
 * @apiDescription 根据商品ID删除商品
 *
 * @apiHeader {String} Authorization Bearer <token>
 * @apiParam {String} id 商品ID
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg 操作信息
 * @apiSuccess {Object} data 删除的商品信息
 */
export const deleteGoodsById = [
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const deletedGoods = await deleteGoods(id);

      if (!deletedGoods) {
        return res.status(404).json({
          code: 0,
          err: '未找到对应的商品',
        });
      }

      res.json({
        code: 1,
        msg: '删除商品成功',
        data: deletedGoods,
      });
    } catch (error) {
      console.error('Error deleting goods:', error);
      res.status(500).json({
        code: 0,
        err: '服务器内部错误',
      });
    }
  },
];

/**
 * @api {patch} /goods/:id 更新商品
 * @apiName updateGoods
 * @apiGroup Goods
 * @apiVersion 0.0.1
 *
 * @apiDescription 根据商品ID更新商品信息
 *
 * @apiHeader {String} Authorization Bearer <token>
 * @apiParam {String} id 商品ID
 * @apiBody {Object} values 更新的值
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg 操作信息
 * @apiSuccess {Object} data 更新后的商品信息
 */
export const updateGoodsById = [
  singleFileUpload('values.subCategory.goods.img'),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { values } = req.body;

      if (!values) {
        return res.status(400).json({
          code: 0,
          err: '参数不对',
        });
      }

      // 如果请求中包含图片文件，则更新图片信息
      if (req.file) {
        const img = req.file.buffer.toString('base64');
        values.subCategory.goods.img = img;
      }

      const updatedGoods = await updateGoods(id, values);

      if (!updatedGoods) {
        return res.status(404).json({
          code: 0,
          err: '未找到对应的商品',
        });
      }

      res.json({
        code: 1,
        msg: '更新商品成功',
        data: updatedGoods,
      });
    } catch (error) {
      console.error('Error updating goods:', error);
      res.status(500).json({
        code: 0,
        err: '服务器内部错误',
      });
    }
  },
];

/**
 * @api {get} /goods/:id 获取单个商品
 * @apiName getGoodsById
 * @apiGroup Goods
 * @apiVersion 0.0.1
 *
 * @apiDescription 根据商品ID获取单个商品信息
 *
 * @apiHeader {String} Authorization Bearer <token>
 * @apiParam {String} id 商品ID
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {Object} data 单个商品信息
 */
export async function getGoodsById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const goods = await findGoods(id);

    if (!goods) {
      return res.status(404).json({
        code: 0,
        err: "未找到对应的商品",
      });
    }

    res.json({
      code: 1,
      data: goods,
    });
  } catch (error) {
    console.error("Error fetching goods:", error);
    res.status(500).json({
      code: 0,
      err: "服务器内部错误",
    });
  }
}

/**
 * @api {get} /goods 获取所有商品
 * @apiName getAllGoods
 * @apiGroup Goods
 * @apiVersion 0.0.1
 *
 * @apiDescription 获取所有商品信息
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {Object} data 所有商品信息数组
 */
export async function getAllGoods(req: Request, res: Response) {
  try {
    const goods = await findAllGoods();
    res.json({
      code: 1,
      data: goods,
    });
  } catch (error) {
    console.error("Error fetching goods:", error);
    res.status(500).json({
      code: 0,
      err: "服务器内部错误",
    });
  }
}
