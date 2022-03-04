import React, { useState } from "react";
import ModalComponent from "./ModalComponent";
const placeHolder = "https://dummyimage.com/500x400/000/fff";

const Display = React.forwardRef(({ items }, ref) => {
  const [show, setShow] = useState(false);
  const openModalHandler = () => setShow(true);
  return (
    <>
      <img
        ref={ref}
        src={placeHolder}
        data-src={items.urls.regular}
        className="column lazy_image"
        width="500px"
        height="400px"
        onClick={() => openModalHandler()}
        alt={items.alt_description}
      />
      {show && <ModalComponent setIsOpen={setShow} item={items} />}
    </>
  );
});

export default Display;
