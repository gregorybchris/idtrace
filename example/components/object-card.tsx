import { Object } from "@/lib/models/object";
import { shortUuid } from "@/lib/utilities/format-utilities";
import { cn } from "@/lib/utilities/style-utilities";
import { CancelButton } from "./cancel-button";

type ObjectCardProps = {
  object: Object;
  current: boolean;
  onSelect: () => void;
  onDelete: () => void;
};

export function ObjectCard({
  object,
  current,
  onSelect,
  onDelete,
}: ObjectCardProps) {
  return (
    <div className="group flex flex-row justify-between gap-1">
      <div
        className={cn("flex cursor-pointer flex-col gap-1 rounded px-3 py-2", {
          "bg-stone-200 hover:bg-stone-300": current,
          "hover:bg-stone-200": !current,
        })}
        onClick={onSelect}
      >
        <div>{object.name}</div>
        <div className="font-geist-mono text-xs">{shortUuid(object.id)}</div>
      </div>
      <CancelButton
        className="rounded opacity-0 group-hover:opacity-100"
        onClick={onDelete}
      />
    </div>
  );
}
