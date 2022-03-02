import { useState, useEffect, useRef } from "react";

function useIntersectionObserver(options) {
  const [targetElement, setTargetElement] = useState([]);
  const [entries, setEntries] = useState([]);
  const observer = useRef(null);
  const { root, rootMargin, threshold } = options || {};
  useEffect(() => {
    if (targetElement.length) {
      observer.current = new IntersectionObserver(
        (Entries) => {
          setEntries(Entries);
        },
        {
          root,
          rootMargin,
          threshold,
        }
      );
      targetElement.forEach((element) => {
        observer.current.observe(element);
      });
    }
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [targetElement, root, rootMargin, threshold]);
  return [entries, observer.current, setTargetElement];
}

export default useIntersectionObserver;
