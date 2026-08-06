// import { cn } from "@/lib/utils";

type DividerProps = {
  text?: string;
  className?: string;
};

const Divider = ({
  text = "or",
  className,
}: DividerProps) => {
  return (
    <div
      className={
        "flex w-full items-center gap-4"
        // className
      }
    >
      <div className="h-px flex-1 bg-zinc-800" />

      <span className="whitespace-nowrap text-sm text-zinc-500">
        {text}
      </span>

      <div className="h-px flex-1 bg-zinc-800" />
    </div>
  );
};

export default Divider;