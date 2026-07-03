import Image from "next/image";
import Link from "next/link";
import logoImage from "../../logo.png";
import horizontalLogoImage from "../../logo-horizontal.png";

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
      className={`inline-flex shrink-0 items-center ${horizontal ? "" : "gap-2.5"} ${className}`.trim()}
    >
      {horizontal ? (
        <Image
          src={horizontalLogoImage}
          alt=""
          priority
          unoptimized
          sizes="170px"
          className="h-auto w-full object-contain"
        />
      ) : (
        <>
          <Image
            src={logoImage}
            alt=""
            priority
            quality={100}
            sizes="64px"
            className="h-auto w-[38%] max-w-16 shrink-0 object-contain"
          />
          <span className="font-display text-[1.25em] font-semibold tracking-tight text-[#002838]">
            Fishki
          </span>
        </>
      )}
    </Link>
  );
}
