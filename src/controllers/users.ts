import { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  updateUser,
  getUsers,
  findUsername,
} from "@/services/users";

/**
 * @api {delete} /user/:id 删除用户
 * @apiName deleteUser
 * @apiGroup User
 * @apiVersion 0.0.1
 *
 * @apiDescription 根据用户ID删除用户
 *
 * @apiHeader {String} Authorization Bearer <token>
 * @apiParam {String} id 用户ID
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg 操作信息
 * @apiSuccess {Object} data 删除的用户信息
 */
export async function deleteUserById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({
        code: 0,
        err: "未找到对应的用户",
      });
    }

    res.json({
      code: 1,
      msg: "删除用户成功",
      data: deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      code: 0,
      err: "服务器内部错误",
    });
  }
}

/**
 * @api {patch} /user/:id 更新用户
 * @apiName updateUser
 * @apiGroup User
 * @apiVersion 0.0.1
 *
 * @apiDescription 根据用户ID更新用户信息
 *
 * @apiHeader {String} Authorization Bearer <token>
 * @apiParam {String} id 用户ID
 * @apiBody {Object} values 更新的值
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg 操作信息
 * @apiSuccess {Object} data 更新后的用户信息
 */
export async function updateUserById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const values = req.body;

    const updatedUser = await updateUser(id, values);

    if (!updatedUser) {
      return res.status(404).json({
        code: 0,
        err: "未找到对应的用户",
      });
    }

    res.json({
      code: 1,
      msg: "更新用户成功",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      code: 0,
      err: "服务器内部错误",
    });
  }
}

/**
 * @api {get} /user/:id 获取单个用户
 * @apiName getUserById
 * @apiGroup User
 * @apiVersion 0.0.1
 *
 * @apiDescription 根据用户ID获取单个用户信息
 *
 * @apiHeader {String} Authorization Bearer <token>
 * @apiParam {String} id 用户ID
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {Object} data 单个用户信息
 */
export async function getUserById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const user = await findUsername(id);

    if (!user) {
      return res.status(404).json({
        code: 0,
        err: "未找到对应的用户",
      });
    }

    res.json({
      code: 1,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      code: 0,
      err: "服务器内部错误",
    });
  }
}

/**
 * @api {get} /users 获取所有用户
 * @apiName getAllUsers
 * @apiGroup User
 * @apiVersion 0.0.1
 *
 * @apiDescription 获取所有用户信息
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {Object} data 所有用户信息数组
 */
export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await getUsers();
    res.json({
      code: 1,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      code: 0,
      err: "服务器内部错误",
    });
  }
}
