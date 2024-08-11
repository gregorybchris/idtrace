import { Object } from "@/lib/models/object";
import { Nullable } from "@/lib/utilities/type-utilities";
import { AddButton } from "./add-button";
import { ObjectCard } from "./object-card";

type ObjectSelectorProps = {
  title: string;
  objects: Object[];
  currentObject: Nullable<Object>;
  onSelect: (object: Nullable<Object>) => void;
  onDelete: (object: Object) => void;
  onAdd: () => void;
};

export function ObjectSelector({
  title,
  objects,
  currentObject,
  onSelect,
  onDelete,
  onAdd,
}: ObjectSelectorProps) {
  function onSelectObject(object: Object) {
    if (currentObject !== null && object.id === currentObject.id) {
      onSelect(null);
    } else {
      onSelect(object);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="border-b-2 border-stone-400 text-lg">{title}</div>
      <div className="flex flex-col justify-between gap-1">
        <div className="flex flex-col gap-1">
          {objects.map((object) => (
            <div key={object.id}>
              <ObjectCard
                object={object}
                current={
                  currentObject !== null && object.id === currentObject.id
                }
                onSelect={() => onSelectObject(object)}
                onDelete={() => onDelete(object)}
              />
            </div>
          ))}
        </div>
        <AddButton onClick={onAdd} />
      </div>
    </div>
  );
}
