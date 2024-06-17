"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { PopulatedMessageInterface } from "@/models/Message";
import { useGlobalContext } from "@/context/GlobalContext";

const Message = ({ message }: { message: PopulatedMessageInterface }) => {
  const { body, email, phone, sender, property, createdAt } = message;

  const { setUnreadCount } = useGlobalContext();
  const [isRead, setIsRead] = useState<boolean>(message.read);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const handleReadClick = async () => {
    try {
      const response = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });
      if (response.status === 200) {
        setIsRead((prev) => !prev);
        const { read } = await response.json();
        if (read) {
          setUnreadCount((prev) => prev - 1);
          toast.success("Message marked as read");
        } else {
          setUnreadCount((prev) => prev + 1);
          toast.success("Message marked as new");
        }
      } else {
        toast.error("An error occurred");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        toast.success("Message deleted");
        if (!isRead) {
          setUnreadCount((prev) => prev - 1);
        }
        setIsDeleted(true);
      } else {
        toast.error("An error occurred");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>{" "}
        {property?.name || "No Property Name"}
      </h2>
      <p className="text-gray-700">{body || "No message body"}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {sender.username || "No name"}
        </li>

        <li>
          <strong>Reply Email:</strong>{" "}
          <a href={`mailto:${email}`} className="text-blue-500">
            {email || "No email"}
          </a>
        </li>
        {phone && (
          <li>
            <strong>Reply Phone:</strong>{" "}
            <a href={`tel:${phone}`} className="text-blue-500">
              {phone}
            </a>
          </li>
        )}
        <li>
          <strong>Received:</strong> {new Date(createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className={`mt-4 mr-3 ${
          isRead ? "bg-gray-300" : "bg-blue-500 text-white"
        } py-1 px-3 rounded-md`}
      >
        {isRead ? "Mark As New" : "Mark As Read"}
      </button>
      <button
        onClick={handleDeleteClick}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};
export default Message;
