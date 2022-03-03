import React from "react";
const placeHolder = "https://dummyimage.com/500x400/000/fff";

const Display = ({ items }) => (
  <>
    <img
      src={placeHolder}
      data-src={items.urls.regular}
      className="lazy_image"
      width="500px"
      height="400px"
      alt="thumbnails"
    />
  </>
);

export default Display;
