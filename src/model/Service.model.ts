// models/service.model.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IService extends Document {
  name: string;
  price: number;
  description: string;
  store: Types.ObjectId;
}

const ServiceSchema = new Schema<IService>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    store: { type: Schema.Types.ObjectId, ref: "Store", required: true },
  },
  { timestamps: true }
);

export const ServiceModel = mongoose.model<IService>("Service", ServiceSchema);
