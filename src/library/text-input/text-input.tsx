import {
  DetailedHTMLProps,
  FocusEventHandler,
  InputHTMLAttributes,
} from "react";

interface TextInputProps {
  inputProps: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  onFocusSelectAll?: boolean;
  loading?: boolean;
}

export const TextInput = ({
  inputProps,
  onFocusSelectAll,
  loading = false,
}: TextInputProps) => {
  const { className } = inputProps;

  const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    event.target.select();
  };

  return (
    <div className={`relative transition-all ${className}`}>
      <input
        type="text"
        {...inputProps}
        className={`w-full rounded-md border-2 p-3 font-medium
                  ${
                    loading
                      ? "border-slate-800 bg-slate-800 text-slate-700"
                      : ""
                  }`}
        onFocus={onFocusSelectAll ? handleFocus : undefined}
      />
      {loading && (
        <span className="material-symbols-rounded absolute left-0 top-0 flex h-full w-full animate-spin items-center justify-center text-slate-100">
          refresh
        </span>
      )}
    </div>
  );
};
