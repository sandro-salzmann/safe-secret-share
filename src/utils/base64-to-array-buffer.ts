export const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
};
