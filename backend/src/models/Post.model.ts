import { model, Schema } from "mongoose";
import { IPost } from "../types";

const PostSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  article: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true
  },
  banner: {
    type: String,
    required: true
  },
  url:{
    type: String,
    required: true,
    unique: true
  }
});



export default model<IPost>("Post", PostSchema);
