import jwt from "jsonwebtoken";
import type { UserType } from "@/models/users";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const singleFileUpload = (fieldName: string) => {
  return upload.single(fieldName);
};

export const multipleFilesUpload = (fieldName: string, maxCount: number) => {
  return upload.array(fieldName, maxCount);
};

const secretKey = "CMD-ADMIN-API-TOKEN";

export const generateToken = (
  payload: Omit<UserType, "email" | "password"> & Record<string, any>
) => {
  return jwt.sign(payload, secretKey, { expiresIn: "2d" });
};

export const verifyToken = (token: string) => {
  return new Promise((reslove, reject) => {
    jwt.verify(token, secretKey, (err, decode) => {
      if (err) {
        return reject(err);
      }
      reslove(decode);
    });
  });
};
