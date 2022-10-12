import { model, Schema } from "mongoose";
import { IUser } from "../types";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre<IUser>("save", async function (next): Promise<void> {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
  next();
});

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>("User", UserSchema);
