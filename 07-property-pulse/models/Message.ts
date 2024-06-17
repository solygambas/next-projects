import { Schema, model, models } from "mongoose";
import { ObjectId as BSONObjectId } from "bson";

export interface BaseMessageAPIInterface {
  recipient: string;
  property: string;
  name: string;
  email: string;
  phone?: string;
  body: string;
}

export interface BaseMessageInterface {
  recipient: BSONObjectId;
  property: BSONObjectId;
  name: string;
  email: string;
  phone?: string;
  body: string;
}

export interface MessageInterface extends BaseMessageInterface {
  sender: BSONObjectId;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<MessageInterface>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: String,
    body: {
      type: String,
      required: [true, "Message is required"],
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Message =
  models.Message || model<MessageInterface>("Message", MessageSchema);

export default Message;
