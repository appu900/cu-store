import { CreateStoreInput } from "../dto/store.dto";
import { IStore, StoreModel } from "../model/store.model";
import { UserModel } from "../model/user.model";
import { ApiError } from "../utils/api-error";

export const createStore = async (
  storeInputParams: CreateStoreInput,
  userID: string
) => {
  const newStore = new StoreModel({ ...storeInputParams, owner: userID });
  const response = await newStore.save();
  return response;
};

export const getStoreByID = async (storeID: string) => {
  const store = await StoreModel.findById(storeID);
  if (!store) {
    throw new ApiError(404, "not found");
  }
  return store;
};

export const getStoreDetailsByUserID = async (userID: string) => {
  return await StoreModel.find({ owner: userID });
};

export const StoreService = {
  createStore,
  getStoreByID,
  getStoreDetailsByUserID
};
