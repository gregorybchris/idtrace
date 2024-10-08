import { cn } from "@/lib/utilities/style-utilities";
import { PlusCircle } from "@phosphor-icons/react";

type AddButtonProps = {
  className?: string;
  onClick: () => void;
  enabled?: boolean;
};

export function AddButton({ className, onClick, enabled }: AddButtonProps) {
  const isEnabled = enabled ?? true;

  function handleClick() {
    if (isEnabled) {
      onClick();
    }
  }

  return (
    <div
      className={cn(
        "flex select-none flex-row items-center justify-center rounded-full p-1 transition-all",
        isEnabled && "cursor-pointer hover:bg-stone-200",
        className,
      )}
      onClick={handleClick}
    >
      <PlusCircle size={20} color="#505050" weight="duotone" />
    </div>
  );
}
