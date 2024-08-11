import { Vid } from "@/lib/models/vid";
import { VidCard } from "./vid-card";

type VidListProps = {
  vids: Vid[];
  onDeleteVid: (vid: Vid) => void;
  onSelectVid: (vid: Vid) => void;
};

export function VidList({ vids, onDeleteVid, onSelectVid }: VidListProps) {
  return (
    <div>
      <div className="border-b-2 border-stone-400 text-lg">VIDs</div>
      <div>
        {vids.map((vid) => (
          <VidCard
            key={vid.id}
            vid={vid}
            onDeleteVid={onDeleteVid}
            onSelectVid={onSelectVid}
          />
        ))}
      </div>
    </div>
  );
}
