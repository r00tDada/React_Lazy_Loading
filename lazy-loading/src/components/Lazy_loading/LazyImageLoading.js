import React, { useState, useEffect, useRef } from "react";
import styles from "./LazyImageLoading.module.css";
import Display from "./Display";
import { queryAPI } from "./queryAPI";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

const initialState = {
  status: false,
  data: [],
};

function LazyImageLoading() {
  const [state, setState] = useState(initialState);
  const isMounted = useRef(null);

  useEffect(() => {
    isMounted.current = true;
    const results = queryAPI("cars");
    results.then((response) => {
      setState(response);
    });
  }, []);

  const [entries, observer, setTargetElement] = useIntersectionObserver({
    threshold: 0.5,
    root: null,
  });

  useEffect(() => {
    if (state.data.length) {
      setTargetElement(Array.from(document.getElementsByClassName("lazy")));
    }
  }, [state]);

  useEffect(() => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let pendingImage = entry.target;
        pendingImage.src = pendingImage.dataset.src;
        pendingImage.classList.remove("lazy");
        observer.unobserve(pendingImage);
      }
    });
  }, [entries, observer]);

  const images = state.data.map((item) => (
    <Display key={item.id} items={item} laziness={true} />
  ));

  return (
    <div>
      {isMounted.current && (
        <div className={styles.body_main}>
          <h1>Image Lazy Loading</h1>
          <div className={styles.grid_container}>{images}</div>
        </div>
      )}
    </div>
  );
}

export default LazyImageLoading;
