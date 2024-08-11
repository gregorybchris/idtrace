import { Vid } from "@/lib/models/vid";
import { CancelButton } from "./cancel-button";

type VidCardProps = {
  vid: Vid;
  onDeleteVid: (vid: Vid) => void;
  onSelectVid: (vid: Vid) => void;
};

export function VidCard({ vid, onDeleteVid, onSelectVid }: VidCardProps) {
  return (
    <div className="flex flex-row items-center justify-between gap-2">
      <div className="flex flex-row items-center gap-1">
        <div>VID:</div>
        <div
          className="font-geist-mono cursor-pointer text-xs hover:text-stone-500"
          onClick={() => onSelectVid(vid)}
        >
          {vid.id}
        </div>
      </div>
      <CancelButton onClick={() => onDeleteVid(vid)} />
    </div>
  );
}
