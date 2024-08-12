import { cn } from "@/lib/utilities/style-utilities";
import { XCircle } from "@phosphor-icons/react";

type CancelButtonProps = {
  className?: string;
  onClick: () => void;
  enabled?: boolean;
};

export function CancelButton({
  className,
  onClick,
  enabled,
}: CancelButtonProps) {
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
      <XCircle size={20} color="#e06373" weight="duotone" />
    </div>
  );
}
