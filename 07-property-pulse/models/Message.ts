import { ObjectId, Schema, model, models } from "mongoose";

interface MessageInterface {
  sender: ObjectId;
  recipient: ObjectId;
  property: ObjectId;
  name: string;
  email: string;
  phone?: string;
  body: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
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
  models.Message<MessageInterface> ||
  model<MessageInterface>("Message", MessageSchema);

export default Message;
