import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./LazyImageLoading.module.css";
import Display from "./Display";
import useLazyImageLoading from "../hooks/useLazyImageLoading";
import FetchingData from "./FetchingData";

function LazyImageLoading() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, data, error, hasMore] = FetchingData(query, pageNumber);
  const lazy_options = {
    threshold: 0.5,
    root: null,
  };

  const infinite_options = {
    threshold: 0.2,
  };

  const observer = useRef();
  const lastImageRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNo) => prevPageNo + 1);
        }
      }, infinite_options);
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  useLazyImageLoading(lazy_options);

  function inputHandler(event) {
    setQuery(event.target.value);
    setPageNumber(1);
  }

  return (
    <>
      <h1>Image Lazy Loading</h1>
      <input type="text" value={query} onChange={inputHandler}></input>
      <div className="row">
        {data.map((item, index) => {
          if (data.length === index + 1) {
            return <Display ref={lastImageRef} key={item.id} items={item} />;
          } else {
            return <Display key={item.id} items={item} />;
          }
        })}
      </div>
    </>
  );
}

export default LazyImageLoading;

// Note:
// 1. infinite scrolling
// 2. Modal
