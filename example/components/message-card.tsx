import { Message } from "@/lib/models/message";

type MessageCardProps = {
  message: Message;
};

export function MessageCard({ message }: MessageCardProps) {
  return (
    <div className="flex flex-col gap-2" key={message.vid.id}>
      <div className="text-md flex flex-row gap-1">
        <div>from:</div>
        <div className="">{message.fromUser.name}</div>
      </div>
      <div className="text-md flex flex-col gap-2">
        <div className="font-work text-xs">{message.vid.itemId}</div>
        <div className="font-work text-xs">{message.vid.id}</div>
      </div>
    </div>
  );
}
