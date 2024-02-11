import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/utils";
import { assign } from "lodash"

export const isAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        code: 0,
        err: "Unauthorized: Missing or invalid token",
      });
    }

    const token = authorizationHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        code: 0,
        err: "Unauthorized: Missing or invalid token",
      });
    }

    const decodedToken = await verifyToken(token);
    assign(req, { user: decodedToken })

    next();
  } catch (error) {
    console.error("Error in authorization middleware:", error);
    return res.status(500).json({
      code: 0,
      err: "Internal Server Error",
    });
  }
};
