"use client";

import { cn } from "@/lib/utils";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outlined?: boolean;
  small?: boolean;
  icon?: IconType;
  className?: string;
  type?: "submit" | "reset" | "button";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  label,
  disabled,
  outlined,
  small,
  icon: Icon,
  className,
  type,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-auto border-neutral-600 border-1 flex items-center justify-center gap-2 py-3 px-5 my-2 bg-black text-white",
        outlined &&
          "bg-transparent text-black dark:text-white dark:bg-transparent",
        small && "text-sm py-1 px-2",
        className
      )}
    >
      {Icon && <Icon size={18} />}
      {label}
    </button>
  );
};

export default Button;
