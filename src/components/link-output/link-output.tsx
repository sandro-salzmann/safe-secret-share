import { useEffect, useState } from "react";
import { Button } from "../../library/button/button";
import { TextInput } from "../../library/text-input/text-input";
import { copyTextToClipboard } from "../../utils/copy-to-clipboard";
import { EncryptedData } from "../../utils/encrypt";

const SHOW_PASTE_SUCCESS_TIMEOUT = 3000;
const MAX_LINK_LENGTH = 2000;

interface LinkOutputProps {
  disabled?: boolean;
  encryptedData?: EncryptedData;
  loading?: boolean;
}

export const LinkOutput = ({
  disabled = false,
  encryptedData,
  loading = false,
}: LinkOutputProps) => {
  const [showPasteSuccess, setShowPasteSuccess] = useState<boolean>(false);

  let linkValue = "";
  if (encryptedData) {
    const { ciphertextBase64, ivBase64, saltBase64 } = encryptedData;

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("ciphertext", encodeURIComponent(ciphertextBase64));
    urlParams.set("salt", encodeURIComponent(saltBase64));
    urlParams.set("iv", encodeURIComponent(ivBase64));
    linkValue = encryptedData
      ? `${import.meta.env.VITE_BASE_URL}/dec/${urlParams.toString()}`
      : "";
  }

  useEffect(() => {
    if (showPasteSuccess) {
      setTimeout(() => setShowPasteSuccess(false), SHOW_PASTE_SUCCESS_TIMEOUT);
    }
  }, [showPasteSuccess, setShowPasteSuccess]);

  const linkLengthExceedsMaxLength = linkValue?.length > MAX_LINK_LENGTH;

  const linkOpacity = disabled ? "opacity-30" : "opacity-100";

  const onCopyClick = () => {
    copyTextToClipboard(linkValue);
    setShowPasteSuccess(true);
  };

  return (
    <>
      <p className={`mb-2 mt-4 transition-all ${linkOpacity}`}>
        Step 3: Send the link below and your passhprase to the receiver.
      </p>
      <div className="flex gap-3">
        <TextInput
          inputProps={{
            id: "link-value",
            placeholder: "",
            className: `grow ${linkOpacity}`,
            spellCheck: false,
            disabled: disabled || loading,
            value: linkValue,
          }}
          loading={loading}
          onFocusSelectAll
        />
        <Button
          buttonProps={{
            className: `grow-0 ${linkOpacity}`,
            onClick: onCopyClick,
            disabled: disabled || loading,
          }}
          showSuccessVariant={showPasteSuccess}
        >
          <span className="flex items-center gap-2">
            Copy to clipboard
            <span className="material-symbols-rounded">content_paste_go</span>
          </span>
        </Button>
      </div>
      {linkLengthExceedsMaxLength && (
        <label className="mx-3 mt-2 block" htmlFor="link-value">
          <div className="flex gap-4 text-orange-500">
            <span className="material-symbols-rounded mt-0.5 grow-0">
              warning
            </span>
            <div className="grow">
              <p className="mb-1">
                The generated URL is over {MAX_LINK_LENGTH} characters long.
                That might not work on <i>some</i> browsers.
              </p>
            </div>
          </div>
          <div className="flex gap-4 text-purple-500">
            <span className="material-symbols-rounded grow-0">
              arrow_circle_right
            </span>
            <div className="grow">
              <p>
                If errors occur on the recipents side, consider splitting up
                your password or using a smaller one.
              </p>
            </div>
          </div>
        </label>
      )}
    </>
  );
};
