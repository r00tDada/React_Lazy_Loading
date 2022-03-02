import React from "react";
const placeHolder = "https://dummyimage.com/500x400/000/fff";

const Display = ({ items, laziness }) => (
  <div>
    <img
      src={laziness ? placeHolder : items.urls.regular}
      data-src={items.urls.regular}
      className={laziness ? "lazy" : ""}
      width="500px"
      height="400px"
      alt="thumbnails"
    />
    <p>{items.alt_description}</p>
  </div>
);

export default Display;
