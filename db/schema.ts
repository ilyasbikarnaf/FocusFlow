import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v: string) {
          return /.+\@.+\..+/.test(v);
        },
        message: (props: { value: any }) =>
          `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      validate: {
        validator: function (v: string) {
          return /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(v);
        },
        message:
          "Password must contain at least one uppercase letter, one number, and one special character.",
      },
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
