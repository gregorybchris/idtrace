import { User } from "@/lib/models/user";
import { cn } from "@/lib/utilities/style-utilities";

type UserIndicatorProps = {
  user: User;
  current: boolean;
  onClick: () => void;
};

export function UserIndicator({ user, current, onClick }: UserIndicatorProps) {
  return (
    <div className="flex flex-row gap-1">
      <div
        className={cn(
          "flex cursor-pointer flex-col gap-1 rounded px-3 py-1 hover:bg-stone-300",
          current && "bg-stone-200",
        )}
        onClick={onClick}
      >
        <div>{user.name}</div>
      </div>
    </div>
  );
}
