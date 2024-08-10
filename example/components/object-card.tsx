import { Object } from "@/lib/models/object";
import { cn } from "@/lib/utilities/style-utilities";
import { CancelButton } from "./cancel-button";

type ObjectCardProps = {
  object: Object;
  selected: boolean;
  onSelect: () => void;
  onDelete: () => void;
};

export function ObjectCard({
  object,
  selected,
  onSelect,
  onDelete,
}: ObjectCardProps) {
  return (
    <div className="flex flex-row justify-between gap-1">
      <div
        className={cn(
          "flex cursor-pointer flex-col gap-1 rounded px-4 py-2 hover:bg-stone-300",
          selected && "bg-stone-200",
        )}
        onClick={onSelect}
      >
        <div>{object.name}</div>
        <div className="font-work text-xs">{object.id}</div>
      </div>
      <CancelButton onClick={onDelete} />
    </div>
  );
}
