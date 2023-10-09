import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { ReactElement } from "../types";

interface ButtonProps {
  buttonProps: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  children: ReactElement;
  showSuccessVariant?: boolean;
}

export const Button = ({
  buttonProps,
  children,
  showSuccessVariant,
}: ButtonProps) => {
  const { className = "" } = buttonProps;

  const baseClasses = `flex justify-center rounded-md border-2 p-3 font-medium transition-all`;
  const successClasses =
    showSuccessVariant && "border-green-700 bg-green-700 text-green-50";

  return (
    <button
      {...buttonProps}
      className={`${className} ${baseClasses} ${successClasses}`}
    >
      <span className={showSuccessVariant ? "invisible" : ""}>{children}</span>
      <span
        className={`${showSuccessVariant ? "" : "invisible"} 
                    absolute flex items-center gap-2`}
      >
        Done
        <span className="material-symbols-rounded">check_circle</span>
      </span>
    </button>
  );
};
