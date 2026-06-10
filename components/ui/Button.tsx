import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "gold" | "ghost" | "dark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 font-semibold rounded-btn " +
  "transition-[transform,box-shadow] duration-150 ease-out " +
  "hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper " +
  "focus-visible:ring-pitch select-none";

const variants: Record<Variant, string> = {
  primary: "bg-pitch text-white shadow-lift hover:shadow-[0_10px_22px_rgba(15,122,78,.34)]",
  gold: "bg-gold text-[#231a02] shadow-gold hover:shadow-[0_10px_22px_rgba(215,160,40,.36)]",
  ghost: "bg-white text-ink border-[1.5px] border-line shadow-soft hover:border-ink/30",
  dark: "bg-ink text-white hover:opacity-90",
};

const sizes: Record<Size, string> = {
  md: "text-[15px] px-[22px] py-[13px]",
  lg: "text-base px-[26px] py-[15px]",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
};

function inner(children: ReactNode, arrow?: boolean) {
  return (
    <>
      {children}
      {arrow && <span aria-hidden className="font-extrabold">&rarr;</span>}
    </>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  arrow,
  className = "",
  onClick,
  type = "button",
}: CommonProps & {
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {inner(children, arrow)}
    </button>
  );
}

export function ButtonLink({
  children,
  href,
  variant = "primary",
  size = "md",
  arrow,
  className = "",
}: CommonProps & { href: string }) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {inner(children, arrow)}
    </Link>
  );
}
