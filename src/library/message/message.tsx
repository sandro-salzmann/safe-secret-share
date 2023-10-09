import { ReactElement } from "../types";

interface MessageProps {
  className?: string;
  children?: ReactElement;
}

export const Message = ({ className = "", children }: MessageProps) => {
  return (
    <div className={`rounded-md p-3 transition-all ${className}`}>
      {children}
    </div>
  );
};
