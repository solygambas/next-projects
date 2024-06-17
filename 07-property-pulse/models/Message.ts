import { Schema, model, models } from "mongoose";
import { ObjectId as BSONObjectId } from "bson";

interface BaseMessageInterface {
  name: string;
  email: string;
  phone?: string;
  body: string;
}

export interface BaseMessageAPIInterface extends BaseMessageInterface {
  recipient: string;
  property: string;
}

export interface MessageInterface extends BaseMessageInterface {
  _id: string;
  recipient: BSONObjectId;
  property: BSONObjectId;
  sender: BSONObjectId;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PopulatedSender {
  username: string;
}

export interface PopulatedProperty {
  name: string;
}

export interface PopulatedMessageInterface
  extends Omit<MessageInterface, "sender" | "property"> {
  sender: PopulatedSender;
  property: PopulatedProperty;
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
