import React, { useState } from "react";
import ModalComponent from "./ModalComponent";
import styles from "./LazyImageLoading.module.css";

const placeHolder = "https://dummyimage.com/500x400/575757/ffffff";

const Display = React.forwardRef(({ items }, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <img
        ref={ref}
        src={placeHolder}
        data-src={items.urls.regular}
        className={"lazy_image " + styles.image}
        onClick={() => setIsModalOpen(true)}
        alt={items.alt_description}
      />
      {isModalOpen && (
        <ModalComponent
          onModalClose={setIsModalOpen}
          isMaskVisible={true}
          item={items}
          maskTransparency="0.9"
          width="85%"
          height="auto"
        />
      )}
    </>
  );
});

export default Display;
