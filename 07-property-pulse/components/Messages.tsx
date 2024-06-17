"use client";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import Message from "./Message";
import { PopulatedMessageInterface } from "@/models/Message";

const Messages = () => {
  const [messages, setMessages] = useState<PopulatedMessageInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/messages");
        if (response.status === 200) {
          const data: PopulatedMessageInterface[] = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error("An error occurred", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
          {loading ? (
            <Spinner loading={loading} />
          ) : messages.length === 0 ? (
            <p>You have no messages</p>
          ) : (
            messages.map((message) => (
              <Message key={message._id} message={message} />
            ))
          )}
          <div className="space-y-4"></div>
        </div>
      </div>
    </section>
  );
};
export default Messages;
