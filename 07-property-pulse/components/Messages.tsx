"use client";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import { MessageInterface } from "@/models/Message";

const Messages = () => {
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/messages");
        if (response.status === 200) {
          const data: MessageInterface[] = await response.json();
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

  return <div>Messages</div>;
};
export default Messages;
