import { cn } from "@/lib/utilities/style-utilities";

type SimpleButtonProps = {
  className?: string;
  text: string;
  onClick: () => void;
  enabled?: boolean;
};

export function SimpleButton({
  className,
  text,
  onClick,
  enabled,
}: SimpleButtonProps) {
  const isEnabled = enabled ?? true;

  function handleOnClick() {
    if (isEnabled) {
      onClick();
    }
  }

  return (
    <div
      className={cn(
        "select-none rounded px-4 py-1 transition-all",
        isEnabled
          ? "cursor-pointer text-stone-700 hover:bg-stone-300 hover:text-stone-800"
          : "text-stone-400",
        className,
      )}
      onClick={handleOnClick}
    >
      {text}
    </div>
  );
}
