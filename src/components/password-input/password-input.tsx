import { ChangeEventHandler } from "react";
import { TextInput } from "../../library/text-input/text-input";

interface PasswordInputProps {
  password?: string;
  onPasswordChange: ChangeEventHandler<HTMLInputElement>;
}

export const PasswordInput = ({
  onPasswordChange,
  password,
}: PasswordInputProps) => {
  return (
    <>
      <p className="mb-2 mt-4">Step 1: Enter your password</p>
      <TextInput
        inputProps={{
          id: "password-input",
          placeholder: "Your password",
          type: "password",
          className: "block my-2 w-full",
          autoComplete: "off",
          autoFocus: true,
          spellCheck: false,
          onChange: onPasswordChange,
          value: password,
        }}
      />
    </>
  );
};
