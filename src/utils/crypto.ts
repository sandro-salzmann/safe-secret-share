export const KEY_TYPE = "AES-GCM";

export const makeKey = async (
  passphrase: string,
  salt: ArrayBuffer,
  keyUsage: readonly ("decrypt" | "encrypt")[],
) => {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(passphrase),
    { name: "PBKDF2" },
    false,
    ["deriveKey"],
  );
  const key = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    { name: KEY_TYPE, length: 256 },
    false,
    keyUsage,
  );

  return key;
};
