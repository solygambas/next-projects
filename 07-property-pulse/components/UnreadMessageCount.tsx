"use client";
import { useGlobalContext } from "@/context/GlobalContext";
import { useEffect } from "react";

const UnreadMessageCount = () => {
  const { unreadCount, setUnreadCount } = useGlobalContext();

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await fetch("/api/messages/unread-count");
        const data: number = await response.json();
        setUnreadCount(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUnreadCount();
  }, []);

  return unreadCount === 0 ? null : (
    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
      {unreadCount}
    </span>
  );
};
export default UnreadMessageCount;
