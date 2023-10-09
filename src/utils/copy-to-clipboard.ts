const fallbackCopyTextToClipboard = (text: string) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand("copy");
    if (successful) {
      console.info("Successfully copied to clipboard via fallback");
    } else console.error("Failed to copy to clipboard via fallback");
  } catch (err) {
    console.error("Failed to copy to clipboard via fallback", err);
  }

  document.body.removeChild(textArea);
};

export const copyTextToClipboard = (text: string) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }

  navigator.clipboard.writeText(text).then(
    () => console.info("Successfully copied to clipboard"),
    (err) => console.error("Failed to copy to clipboard", err),
  );
};
