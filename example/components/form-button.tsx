import { cn } from "@/lib/utilities/style-utilities";

type FormButtonProps = {
  className?: string;
  text: string;
  enabled?: boolean;
};

export function FormButton({ className, text, enabled }: FormButtonProps) {
  const isEnabled = enabled ?? true;

  return (
    <input
      type="submit"
      className={cn(
        "select-none rounded px-4 py-1 transition-all",
        isEnabled
          ? "cursor-pointer text-stone-700 hover:bg-stone-200 hover:text-stone-800"
          : "text-stone-400",
        className,
      )}
      value={text}
      disabled={!isEnabled}
    />
  );
}
