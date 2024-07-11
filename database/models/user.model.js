import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    isBlocked: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model("User", schema);
