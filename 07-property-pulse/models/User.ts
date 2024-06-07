import { ObjectId, Schema, model, models } from "mongoose";

interface GoogleUser {
  email: string;
  username: string;
  image?: string;
  bookmarks?: ObjectId[];
  createdAt: string;
  updatedAt: string;
}

const UserSchema = new Schema<GoogleUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    image: String,
    bookmarks: [{ type: Schema.Types.ObjectId, ref: "Property" }],
  },
  { timestamps: true }
);

const User = models.User<GoogleUser> || model<GoogleUser>("User", UserSchema);

export default User;
