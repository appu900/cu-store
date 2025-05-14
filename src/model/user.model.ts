import mongoose, { Document, Schema } from "mongoose";
export type Role = "user" | "admin";

export interface Iuser extends Document {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: Role;
}

const UserSchema = new Schema<Iuser>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    timestamps: true,
  }
);

UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id, delete ret.password;
  },
});

export const UserModel = mongoose.model<Iuser>("User", UserSchema);
