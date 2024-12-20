import { Dialog } from "@headlessui/react";
import { ChangeEventHandler, useEffect, useState } from "react";
import {
  CRYPTO_INPUT_DEBOUNCE_TIMEOUT,
  SHOW_PASTE_SUCCESS_TIMEOUT,
} from "../../config/config";
import { Button } from "../../library/button/button";
import { Link } from "../../library/link/link";
import { Message } from "../../library/message/message";
import { TextInput } from "../../library/text-input/text-input";
import { copyTextToClipboard } from "../../utils/copy-to-clipboard";
import { decrypt } from "../../utils/decrypt";
import { useDebounce } from "../../utils/use-debounce";
import { useTimedResetState } from "../../utils/use-timed-reset-state";

export const DecryptModal = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const ciphertext = urlParams.get("ciphertext");
  const salt = urlParams.get("salt");
  const iv = urlParams.get("iv");
  const [isOpen, setIsOpen] = useState<boolean>(!!ciphertext && !!salt && !!iv);
  const [passphrase, setPassphrase] = useState<string>();
  const [decryptedPassword, setDecryptedPassword] = useState<string>();
  const debouncedPassphrase = useDebounce<string | undefined>(
    passphrase,
    CRYPTO_INPUT_DEBOUNCE_TIMEOUT,
  );
  const [showPasteSuccess, setShowPasteSuccess] = useTimedResetState<boolean>(
    false,
    SHOW_PASTE_SUCCESS_TIMEOUT,
  );
  const [isDecrypting, setIsDecrypting] = useState<boolean>(false);

  useEffect(() => {
    setIsDecrypting(!!passphrase?.trim());
    setDecryptedPassword(undefined);
  }, [passphrase]);

  useEffect(() => {
    let isCancelled = false;

    const encryptValues = async () => {
      if (debouncedPassphrase?.trim() && ciphertext && salt && iv) {
        try {
          const decryptedPassword = await decrypt({
            ciphertextBase64: decodeURIComponent(ciphertext),
            ivBase64: decodeURIComponent(iv),
            saltBase64: decodeURIComponent(salt),
            passphrase: debouncedPassphrase,
          });

          if (!isCancelled) {
            setDecryptedPassword(decryptedPassword);
            setIsDecrypting(false);
          }
        } catch (error) {
          if (!isCancelled) {
            setIsDecrypting(false);
            setDecryptedPassword(undefined);
          }
        }
      }
    };

    void encryptValues();

    return () => {
      isCancelled = true;
    };
  }, [ciphertext, debouncedPassphrase, iv, salt]);

  const onPassphraseChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassphrase(e.target.value);
  };

  const onCopyClick = () => {
    if (!decryptedPassword) return;

    copyTextToClipboard(decryptedPassword);
    setShowPasteSuccess(true);
  };

  const passwordOpacity = !passphrase ? "opacity-30" : "opacity-100";
  const passwordPlaceholder =
    passphrase && !isDecrypting ? "Incorrect passphrase" : "Password";

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-lg"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="max-w-md rounded-xl bg-white p-6">
          <Dialog.Title className="mb-4 text-xl font-semibold">
            Decrypt password {decryptedPassword ? "🔓" : "🔒"}
          </Dialog.Title>
          <Dialog.Description className="my-4">
            <Message className=" bg-purple-200 text-purple-800">
              <>
                You received a <strong>password</strong> that was{" "}
                <strong>encrypted with a passphrase</strong>.
              </>
            </Message>
          </Dialog.Description>
          <p className={`mb-2 mt-4`}>Please enter the passphrase</p>
          <TextInput
            inputProps={{
              id: "passphrase-input",
              placeholder: "Passhprase",
              type: "password",
              autoComplete: "off",
              className: `block mt-2 mb-4 w-full`,
              spellCheck: false,
              onChange: onPassphraseChange,
              value: passphrase,
            }}
          />
          <div className="my-4 flex gap-3">
            <TextInput
              inputProps={{
                id: "password-value",
                placeholder: passwordPlaceholder,
                className: `grow ${passwordOpacity}`,
                spellCheck: false,
                disabled: !decryptedPassword,
                value: decryptedPassword ?? "",
                readOnly: true,
              }}
              loading={isDecrypting}
              onFocusSelectAll
            />
            <Button
              buttonProps={{
                className: `grow-0 ${passwordOpacity}`,
                onClick: onCopyClick,
                disabled: !decryptedPassword,
              }}
              showSuccessVariant={showPasteSuccess}
            >
              <span className="flex items-center gap-2">
                Copy
                <span className="material-symbols-rounded">
                  content_paste_go
                </span>
              </span>
            </Button>
          </div>
          <hr />
          <div className="mt-4 text-center">
            <Link href={import.meta.env.VITE_BASE_URL}>
              Encrypt your own password
            </Link>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
