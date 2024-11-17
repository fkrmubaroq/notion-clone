import { useEffect } from "react";

export default function useSensorKeyboard(keys: string[], fn: (key:string) => void, options?: {
  usingCtrl?: boolean
}) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      const isUsingCtrl = options?.usingCtrl;
      if (keys.includes(e.key) && (isUsingCtrl ? e.ctrlKey || e.metaKey : true)) {
        fn(e.key);
      }
    };
    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);
}
