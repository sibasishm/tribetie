import { useCallback, useRef, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useIntersection<T extends HTMLElement = any>(
  options?: ConstructorParameters<typeof IntersectionObserver>[1],
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (element: T | null) => {
      if (observer.current) {
        observer.current.disconnect();
        observer.current = null;
      }

      if (element === null) {
        setEntry(null);
        return;
      }

      observer.current = new IntersectionObserver(([_entry]) => {
        if (_entry) {
          setEntry(_entry);
        }
      }, options);

      observer.current.observe(element);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options?.rootMargin, options?.root, options?.threshold],
  );

  return { ref, entry };
}
