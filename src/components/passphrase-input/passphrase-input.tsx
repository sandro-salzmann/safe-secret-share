import { ChangeEventHandler } from "react";
import { TextInput } from "../../library/text-input/text-input";

interface PassphraseInputProps {
  passphrase?: string;
  onPassphraseChange: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

export const PassphraseInput = ({
  passphrase,
  onPassphraseChange,
  disabled = false,
}: PassphraseInputProps) => {
  const linkOpacity = disabled ? "opacity-30" : "opacity-100";

  return (
    <>
      <p className={`mb-2 mt-4 transition-all ${linkOpacity}`}>
        Step 2: Create a passphrase to encrypt your password
      </p>
      <TextInput
        inputProps={{
          id: "passphrase-input",
          placeholder: "Your passhprase",
          type: "password",
          autoComplete: "off",
          className: `block my-2 w-full ${linkOpacity}`,
          spellCheck: false,
          disabled: disabled,
          onChange: onPassphraseChange,
          value: passphrase,
        }}
      />
    </>
  );
};
