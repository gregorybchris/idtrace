import { cn } from "@/lib/utilities/style-utilities";

type TextBoxProps = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  enabled?: boolean;
};

export function TextBox({ className, value, onChange, enabled }: TextBoxProps) {
  const isEnabled = enabled ?? true;

  return (
    <input
      type="text"
      className={cn(
        "rounded border-2 border-stone-700 bg-transparent px-4 py-2 transition-all focus:outline-none",
        isEnabled
          ? "text-stone-700 hover:text-stone-800"
          : "border-stone-400 text-stone-400",
        className,
      )}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={!isEnabled}
      autoFocus
    />
  );
}
