import { arrayBufferToBase64 } from "./array-buffer-to-base64";
import { KEY_TYPE, makeKey } from "./crypto";

export interface EncryptedData {
  ivBase64: string;
  saltBase64: string;
  ciphertextBase64: string;
}

export type EncryptFn = (params: {
  plaintext: string;
  passphrase: string;
}) => Promise<EncryptedData>;

export const encrypt: EncryptFn = async ({ plaintext, passphrase }) => {
  // Generate a random salt
  const salt = crypto.getRandomValues(new Uint8Array(16));

  // Derive a key from the passphrase
  const key = await makeKey(passphrase, salt, ["encrypt"]);

  // Generate a random initialization vector (IV)
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // Encrypt the plaintext
  const ciphertext = await crypto.subtle.encrypt(
    { name: KEY_TYPE, iv },
    key,
    new TextEncoder().encode(plaintext),
  );

  return {
    ciphertextBase64: arrayBufferToBase64(ciphertext),
    ivBase64: arrayBufferToBase64(iv),
    saltBase64: arrayBufferToBase64(salt),
  };
};
