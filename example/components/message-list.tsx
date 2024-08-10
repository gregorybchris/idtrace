import { Client } from "@/lib/client/client";
import { Message } from "@/lib/models/message";
import { Nullable } from "@/lib/utilities/type-utilities";
import { User } from "next-auth";
import { useEffect } from "react";
import { MessageCard } from "./message-card";

type MessageListProps = {
  client: Client;
  currentUser: Nullable<User>;
  messages: Message[];
};

export function MessageList({
  client,
  currentUser,
  messages,
}: MessageListProps) {
  useEffect(() => {
    fetchVids();
  }, []);

  function fetchVids() {
    client.getVids().then((vids) => {
      console.log("VIDs: ", vids);
    });
  }

  return (
    <div>
      <div className="text-lg">messages</div>
      <div>
        {messages.map((message) => (
          <MessageCard key={message.vid.id} message={message} />
        ))}
      </div>
    </div>
  );
}
