import { useEffect, useState } from "react";

export const useTimedResetState = <T>(
  defaultValue: T,
  timeout: number,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(defaultValue);

  useEffect(() => {
    if (state !== defaultValue) {
      const resetTimer = setTimeout(() => {
        setState(defaultValue);
      }, timeout);

      return () => clearTimeout(resetTimer);
    }
  }, [state, defaultValue, timeout]);

  return [state, setState];
};
