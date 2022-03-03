import React from "react";
const placeHolder = "https://dummyimage.com/500x400/000/fff";

const Display = React.forwardRef(({ items }, ref) => {
  return (
    <>
      <img
        ref={ref}
        src={placeHolder}
        data-src={items.urls.regular}
        className="column lazy_image"
        width="500px"
        height="400px"
        alt={items.alt_description}
      />
    </>
  );
});

export default Display;
