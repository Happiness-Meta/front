import { RefObject, useEffect } from "react";

const ClickOutsideFalse = (
  ref: RefObject<HTMLDivElement>,
  state: boolean,
  setState: () => void
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (state === true) setState();
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, state, setState]);
};

export default ClickOutsideFalse;
