import { Request, Response } from "express";
import { generateToken } from "@/utils";
import { findUsername, createUser } from "@/services/users";

/**
 * @api {post} /auth/login 登录
 * @apiName login
 * @apiGroup Auth
 * @apiVersion 0.0.1
 *
 * @apiDescription 管理员账户登录
 *
 * @apiBody {String} username 管理员账户 admin
 * @apiBody {String} password 管理员密码 `p@ssw0rd`
 *
 * @apiSuccess {String} message 登录成功
 * @apiSuccess {Object} data 成功数据
 * @apiSuccess {string} data.identity 成功数据
 * @apiSuccess {String} data.username 账户
 * @apiSuccess {String} data.token 访问令牌
 *
 */
export async function adminLogin(req: Request, res: Response) {
  const { email, username, password } = req.body;
  if (email) {
    return res.status(400).json({
      code: 0,
      err: "账户不是管理员",
    });
  }
  if (username !== "admin" || password !== "p@ssw0rd") {
    return res.status(400).json({
      code: 0,
      err: "账户密码错误",
    });
  }

  function success(data: Record<string, any>) {
    return res.status(201).json({
      code: 1,
      message: "登录成功",
      data,
    });
  }

  const hasUser = await findUsername(username);
  if (!hasUser) {
    const user = await createUser({
      username,
      password,
      identity: "admin",
    });
    const token = generateToken({
      username,
      identity: user.identity as "admin",
      _id: user._id,
    });
    return success({
      identity: "admin",
      username: "admin",
      token,
    });
  }

  const token = generateToken({
    username,
    identity: hasUser.identity as "admin",
    _id: hasUser._id,
  });
  success({
    identity: "admin",
    username: "admin",
    token,
  });
}

export function register() {}
