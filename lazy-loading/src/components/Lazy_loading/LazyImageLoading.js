import React from "react";
import styles from "./LazyImageLoading.module.css";
import Display from "./Display";
import useLazyImageLoading from "../hooks/useLazyImageLoading";
import FetchingData from "./FetchingData";

function LazyImageLoading() {
  const [loading, data, error] = FetchingData("cars");

  const options = {
    threshold: 0.5,
    root: null,
  };

  useLazyImageLoading(options);

  if (loading) {
    return <h1>Loading the API...</h1>;
  }
  if (error) {
    return <h1>Error while fetching API...</h1>;
  }

  return (
    <>
      <div className={styles.body_main}>
        <h1>Image Lazy Loading</h1>
        <input type="text"></input>
        <div className={styles.grid_container}>
          {data.map((item) => (
            <Display key={item.id} items={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default LazyImageLoading;

// Note:
// 1. infinite scrolling
// 2. Modal
