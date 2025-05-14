import bcrypt from "bcryptjs";
import { Role, UserModel } from "../model/user.model";
import { generateToken } from "../utils/jwt";
import { env } from "../config/env";
import { ApiError } from "../utils/api-error";

export const register = async (userParams: any) => {
  const userExists = await UserModel.findOne({ email: userParams.email });
  if (userExists) {
    throw new ApiError(401, "User already exists");
  }
  const hashedPassword = bcrypt.hashSync(userParams.password, 10);
  userParams.password = hashedPassword;
  const newUser = new UserModel(userParams);
  await newUser.save();
  return newUser;
};

export const authenticate = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = generateToken({ sub: user.id, role: user.role });
    return { ...user.toJSON(), token };
  }
};

export const getAllUsers = async () => {
  return await UserModel.find();
};

export const getUser = async (userID: string) => {
  const user = await UserModel.findOne({ _id: userID });
  if (!user) {
    throw new ApiError(404, "User Not found");
  } else {
    return user;
  }
};

export const UserService = {
  register,
  authenticate,
  getAllUsers,
  getUser,
};
