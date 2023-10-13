import { base64ToArrayBuffer } from "./base64-to-array-buffer";
import { KEY_TYPE, makeKey } from "./crypto";

interface DecryptOptions {
  ciphertextBase64: string;
  passphrase: string;
  ivBase64: string;
  saltBase64: string;
}

export const decrypt = async ({
  ciphertextBase64,
  ivBase64,
  passphrase,
  saltBase64,
}: DecryptOptions): Promise<string> => {
  // Convert base64 strings to binary data
  const ciphertext = base64ToArrayBuffer(ciphertextBase64);
  const iv = base64ToArrayBuffer(ivBase64);
  const salt = base64ToArrayBuffer(saltBase64);

  // Derive a key from the passphrase
  const key = await makeKey(passphrase, salt, ["decrypt"]);

  // Decrypt the ciphertext
  const plaintextBuffer = await crypto.subtle.decrypt(
    { name: KEY_TYPE, iv },
    key,
    ciphertext,
  );

  return new TextDecoder().decode(plaintextBuffer);
};
