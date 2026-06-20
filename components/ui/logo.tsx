import Image from "next/image";
import Link from "next/link";
import logoImage from "../../logo.png";

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
      <Image
        src={logoImage}
        alt=""
        priority
        sizes="64px"
        className="h-auto w-[38%] max-w-16 shrink-0 object-contain"
      />
      <span className={`font-display font-semibold tracking-tight text-[#002838] ${horizontal ? "text-[1.45em]" : "text-[1.25em]"}`}>
        Fishki
      </span>
    </Link>
  );
}
