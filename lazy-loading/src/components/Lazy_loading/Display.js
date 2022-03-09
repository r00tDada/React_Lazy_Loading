import React, { useState } from "react";
import ModalComponent from "./ModalComponent";
import styles from "./LazyImageLoading.module.css";

const placeHolder = "https://dummyimage.com/500x400/575757/ffffff";

const Display = React.forwardRef(({ items }, ref) => {
  const [show, setShow] = useState(false);
  const openModalHandler = () => setShow(true);
  return (
    <>
      <img
        ref={ref}
        src={placeHolder}
        data-src={items.urls.regular}
        className={"lazy_image " + styles.image}
        onClick={() => openModalHandler()}
        alt={items.alt_description}
      />
      {show && <ModalComponent setIsOpen={setShow} item={items} />}
    </>
  );
});

export default Display;
