import React, { useState } from "react";
import Modal from "./Modal";
const placeHolder = "https://dummyimage.com/500x400/000/fff";

const Display = React.forwardRef(({ items }, ref) => {
  const [IsModal, setIsModal] = useState(false);
  const handleShowDialog = () => {
    setIsModal(true);
  };
  return (
    <>
      {IsModal ? (
        <Modal image={items.urls.raw} description={items.alt_description} />
      ) : null}
      <img
        ref={ref}
        src={placeHolder}
        data-src={items.urls.regular}
        className="column lazy_image"
        width="500px"
        height="400px"
        onClick={() => handleShowDialog()}
        alt={items.alt_description}
      />
    </>
  );
});

export default Display;
