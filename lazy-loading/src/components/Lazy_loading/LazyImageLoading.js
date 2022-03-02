import React, { useState, useEffect } from "react";
import styles from "./LazyImageLoading.module.css";
import Display from "./Display";
import { queryAPI } from "./queryAPI";

const initialState = {
  status: false,
  data: [],
};

function LazyImageLoading() {
  const [state, setState] = useState(initialState);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const results = queryAPI("cars");
    results.then((response) => {
      setState(response);
    });
  }, []);

  const options = {
    threshold: 0.5,
    root: null,
  };

  useEffect(
    function lazyLoadImagesEffect() {
      if (state.data.length) {
        const imageElements = document.querySelectorAll(".lazy_image");
        const observer = new IntersectionObserver((entries, imgObserver) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const pendingImage = entry.target;
            pendingImage.src = pendingImage.dataset.src;
            imgObserver.unobserve(pendingImage);
          });
        }, options);

        imageElements.forEach((image) => {
          observer.observe(image);
        });
      }
    },
    [state, options]
  );

  const display =
    state.status &&
    state.data.map((item) => <Display key={item.id} items={item} />);

  return (
    <div>
      {isMounted && (
        <div className={styles.body_main}>
          <h1>Image Lazy Loading</h1>
          <div className={styles.grid_container}>{display}</div>
        </div>
      )}
    </div>
  );
}

export default LazyImageLoading;
