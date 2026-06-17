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
      href="/#top"
      aria-label="Fishki"
      className={`inline-flex shrink-0 items-center gap-2.5 ${className}`.trim()}
    >
      <span className="relative flex aspect-square w-[34%] max-w-12 items-center justify-center rounded-[30%] bg-[#0F766E] shadow-[0_8px_20px_rgba(15,118,110,0.22)]">
        <span className="absolute h-[46%] w-[16%] rounded-full bg-white" />
        <span className="absolute h-[16%] w-[46%] rounded-full bg-white" />
        <span className="absolute -right-[8%] -top-[8%] h-[28%] w-[28%] rounded-full border-[3px] border-[#F4F7F5] bg-[#E86860]" />
      </span>
      <span className={`font-display font-semibold tracking-tight text-[#002838] ${horizontal ? "text-[1.45em]" : "text-[1.25em]"}`}>
        Fishki
      </span>
    </Link>
  );
}
