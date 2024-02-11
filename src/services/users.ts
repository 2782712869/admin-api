import UserModel from "@/models/users"
import type { UserType } from "@/models/users"

export const getUserByEmail = async (email: string) => {
  return (await UserModel.findOne({ email }))?.toObject()
}

export const createUser = async (user: UserType) => {
  return (await (new UserModel(user)).save()).toObject()
}

export const updateUser = async (id: string, value: Partial<UserType>) => {
  return (await UserModel.findByIdAndUpdate(id, value, { new: true }))?.toObject()
}

export const deleteUser = async (id: string) => {
  return (await UserModel.findByIdAndDelete(id))
}

export const getUsers = async () => {
  return await UserModel.find()
}

export const findUsername = async (username: string) => {
  return (await UserModel.findOne({ username }))?.toObject()
}
