import mongoose, { Schema, Document, Types } from "mongoose";

export interface IStore extends Document {
  storeName: string;
  posterURL?: string;
  owner: Types.ObjectId;
  products?: Types.ObjectId[];
  services?: Types.ObjectId[];
  panNumber: string;
  gstNumber: string;
}

const storeSchema = new Schema<IStore>(
  {
    storeName: { type: String, required: true },
    posterURL: { type: String, default: " " },
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    services: [{ type: Schema.Types.ObjectId, ref: "Service" }],
    panNumber: { type: String },
    gstNumber: { type: String },
  },
  { timestamps: true }
);

storeSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const StoreModel = mongoose.model<IStore>("Store", storeSchema);
