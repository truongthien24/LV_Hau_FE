import { useEffect } from "react";

const OutsideClickDetector = ({ OutSideRef, InSideRef, children, onOutsideClick, styles, classNames }) => {
  const handleClickOutside = (event) => {
    if(InSideRef) {
        if (OutSideRef.current && !OutSideRef.current.contains(event.target) && !InSideRef.current.contains(event.target)) {
            onOutsideClick && onOutsideClick();
            OutSideRef.current.style = 'none';
        }
    } else {
        if (OutSideRef.current && !OutSideRef.current.contains(event.target)) {
            onOutsideClick && onOutsideClick();
            OutSideRef.current.style = 'none';
        }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return <div ref={OutSideRef} style={styles} className={classNames}>{children}</div>;
};

export default OutsideClickDetector;
