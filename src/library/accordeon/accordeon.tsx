import { useState } from "react";
import { ReactElement } from "../types";

interface AccordeonProps {
  className?: string;
  title: string;
  children: ReactElement;
}

export const Accordeon = ({
  title,
  className = "",
  children,
}: AccordeonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onTitleClick = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <div className={className}>
      <div
        className="flex w-max cursor-pointer select-none items-center gap-2"
        onClick={onTitleClick}
      >
        <span className="material-symbols-rounded">
          {isOpen ? "expand_less" : "expand_more"}
        </span>
        {title}
      </div>
      {isOpen && (
        <div className="mt-3 rounded-md bg-slate-200 p-3 text-slate-800">
          {children}
        </div>
      )}
    </div>
  );
};
