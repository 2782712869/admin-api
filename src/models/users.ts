import mongoose from "mongoose"

export type UserType = {
  username: string,
  password: string,
  email?: string,
  avatar?: string,
  identity?: 'user' | 'admin'
}

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  avatar: {
    type: String
  },
  identity: {
    type: String,
    default: 'user'
  }
})

const UserModel = mongoose.model("User", UserSchema)

export default UserModel
