import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

export const Link = (
  props: DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >,
) => {
  const { children, className } = props;

  return (
    <a
      {...props}
      className={`text-blue-500 underline-offset-2 hover:text-blue-700 hover:underline ${className}`}
    >
      {children}
    </a>
  );
};
