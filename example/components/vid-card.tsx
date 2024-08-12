import { Vid } from "@/lib/models/vid";
import { shortUuid } from "@/lib/utilities/format-utilities";
import { CancelButton } from "./cancel-button";

type VidCardProps = {
  vid: Vid;
  onDeleteVid: (vid: Vid) => void;
  onSelectVid: (vid: Vid) => void;
};

export function VidCard({ vid, onDeleteVid, onSelectVid }: VidCardProps) {
  return (
    <div className="flex flex-row items-center justify-between gap-2">
      <div
        className="cursor-pointer font-geist-mono text-xs hover:text-stone-500"
        onClick={() => onSelectVid(vid)}
      >
        {shortUuid(vid.id)}
      </div>
      <CancelButton onClick={() => onDeleteVid(vid)} />
    </div>
  );
}
