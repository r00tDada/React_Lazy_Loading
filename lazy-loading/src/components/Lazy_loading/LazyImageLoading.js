import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./LazyImageLoading.module.css";
import Display from "./Display";
import useLazyImageLoading from "../hooks/useLazyImageLoading";
import useFetchingData from "../hooks/useFetchingData";

function LazyImageLoading() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [
    loading,
    data,
    error,
    hasMore,
    setLoading,
    setData,
    setError,
    setHasMore,
  ] = useFetchingData(query, pageNumber);

  useLazyImageLoading({
    threshold: 0.5,
    root: null,
  });

  const observer = useRef();
  const lastImageRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPageNumber((prevPageNo) => {
              return prevPageNo + 1;
            });
          }
        },
        { threshold: 0.2 }
      );
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  function inputHandler(event) {
    setQuery(event.target.value);
    setPageNumber(1);
  }

  return (
    <>
      <h1>Image Lazy Loading</h1>
      <input
        type="text"
        value={query}
        onChange={inputHandler}
        className={styles.inputbox}
      ></input>
      <div className="row">
        {error ? <h1>Something goes wrong</h1> : null}
        {loading ? <h1>Loading....</h1> : null}
        {data.map((item, index) => {
          if (data.length === index + 1)
            return <Display ref={lastImageRef} key={item.id} items={item} />;
          else return <Display key={item.id} items={item} />;
        })}
      </div>
    </>
  );
}

export default LazyImageLoading;
