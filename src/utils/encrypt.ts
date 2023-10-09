import { arrayBufferToBase64 } from "./array-buffer-to-base64";

export type EncryptedData = {
  ivBase64: string;
  saltBase64: string;
  ciphertextBase64: string;
};

export type EncryptFn = (params: {
  plaintext: string;
  passphrase: string;
}) => Promise<EncryptedData>;

export const encrypt: EncryptFn = async ({ plaintext, passphrase }) => {
  // Generate a random salt
  const salt = crypto.getRandomValues(new Uint8Array(16));

  // Derive a key from the password
  const key = await crypto.subtle
    .importKey(
      "raw",
      new TextEncoder().encode(passphrase),
      { name: "PBKDF2" },
      false,
      ["deriveKey"],
    )
    .then((key) =>
      crypto.subtle.deriveKey(
        { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
        key,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"],
      ),
    );

  // Generate a random initialization vector (IV)
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // Encrypt the plaintext
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(plaintext),
  );

  return {
    ciphertextBase64: arrayBufferToBase64(ciphertext),
    ivBase64: arrayBufferToBase64(iv),
    saltBase64: arrayBufferToBase64(salt),
  };
};
