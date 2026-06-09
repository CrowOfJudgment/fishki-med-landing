import Link from "next/link";

export default function Logo({
  className = "",
  horizontal = false,
}: {
  className?: string;
  horizontal?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Fishki"
      className={`inline-flex shrink-0 items-center gap-2.5 ${className}`.trim()}
    >
      <span className="relative flex aspect-square w-[34%] max-w-12 items-center justify-center rounded-[30%] bg-teal-700 shadow-[0_8px_20px_rgba(15,118,110,0.22)]">
        <span className="absolute h-[46%] w-[16%] rounded-full bg-white" />
        <span className="absolute h-[16%] w-[46%] rounded-full bg-white" />
        <span className="absolute -right-[8%] -top-[8%] h-[28%] w-[28%] rounded-full border-[3px] border-[#f7f6ef] bg-amber-400" />
      </span>
      <span className={`font-display font-semibold tracking-tight text-slate-950 ${horizontal ? "text-[1.45em]" : "text-[1.25em]"}`}>
        Fishki
      </span>
    </Link>
  );
}
