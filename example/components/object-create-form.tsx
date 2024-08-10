import { Object } from "@/lib/models/object";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { CancelButton } from "./cancel-button";
import { FormButton } from "./form-button";
import { TextBox } from "./text-box";

type ObjectCreateFormProps = {
  title: string;
  onCreate: (object: Object) => void;
  onClose: () => void;
};

export function ObjectCreateForm({
  title,
  onCreate,
  onClose,
}: ObjectCreateFormProps) {
  const [name, setName] = useState<string>("");

  return (
    <div className="flex flex-col gap-2">
      <div className="text-lg">{title}</div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onCreate({ id: uuid(), name: name });
          onClose();
        }}
      >
        <div className="flex flex-col gap-2">
          <TextBox value={name} onChange={setName} />
          <div className="flex flex-row gap-2">
            <FormButton text="create" />
            <CancelButton onClick={onClose} />
          </div>
        </div>
      </form>
    </div>
  );
}
