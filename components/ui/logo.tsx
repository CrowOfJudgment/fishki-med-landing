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
      data-analytics-click="logo_home"
      data-analytics-section="navigation"
      className={`inline-flex shrink-0 items-center ${horizontal ? "gap-3" : "gap-2.5"} ${className}`.trim()}
    >
      <Image
        src={logoImage}
        alt=""
        priority
        quality={100}
        sizes={horizontal ? "48px" : "64px"}
        className={
          horizontal
            ? "h-10 w-10 shrink-0 rounded-[22%] object-contain sm:h-11 sm:w-11"
            : "h-auto w-[38%] max-w-16 shrink-0 rounded-[22%] object-contain"
        }
      />
      <span className="font-display text-[1.25em] font-semibold tracking-tight text-[#002838]">
        Fishki
      </span>
    </Link>
  );
}
