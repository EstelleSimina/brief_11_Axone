import type { ButtonHTMLAttributes } from "react";
import "./button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost";
  highlight?: boolean;
}

export const Button = ({
  children,
  className,
  variant = "default",
  highlight = false,
  ...props
}: ButtonProps) => {
  
  const buttonClasses = [
    "button",
    variant === "ghost" ? "button--ghost" : "", 
    highlight ? "button--highlight" : "",
    className
  ].filter(Boolean).join(" ");

  return (
    <button className={buttonClasses} 
    {...props}
    >
      {children}
    </button>
  );
};
