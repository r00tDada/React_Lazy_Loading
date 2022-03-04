import React, { useState, useEffect, useCallback } from "react";
import Display from "./Display";
import styles from "./LazyImageLoading.module.css";
import axios from "axios";
import useLazyImageLoading from "../hooks/useLazyImageLoading";

function InfiniteScroll() {
  const [query, setQuery] = useState("");
  const [photosData, setPhotosData] = useState({
    photos: [],
    page: 1,
    perPage: 30,
  });
  const [loading, setLoading] = useState(false);
  const getPhotos = useCallback((query, page, perPage) => {
    setLoading(true);
    axios({
      method: "GET",
      url: "https://api.unsplash.com/search/photos",
      params: {
        query: query,
        page: page,
        client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
        per_page: perPage,
      },
    })
      .then((data) => {
        if (data) {
          let paginatedData = data.data.results;
          setPhotosData((prev) => {
            return {
              ...prev,
              photos:
                page === 1
                  ? [...paginatedData]
                  : prev.photos.concat([...paginatedData]),
            };
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useLazyImageLoading({
    threshold: 0.5,
    root: null,
  });

  useEffect(() => {
    getPhotos(query, 1, 30);
  }, [query]);

  function inputHandler(event) {
    setQuery(event.target.value);
    setPhotosData((prev) => {
      return { ...prev, page: prev.page + 1 };
    });
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (
      !loading &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
    ) {
      setPhotosData((prev) => {
        return {
          ...prev,
          page: prev.page + 1,
        };
      });
      setLoading(true);
      getPhotos(photosData.page + 1, 30);
      return;
    }
  };

  const { photos } = photosData;

  return (
    <>
      <h1>Image Lazy Loading</h1>
      <input
        type="text"
        value={query}
        onChange={inputHandler}
        className={styles.inputbox}
      ></input>
      {loading ? <h1>Loading....</h1> : null}

      <div className="row">
        {photos.map((item, index) => {
          return <Display key={index} items={item} />;
        })}
      </div>
    </>
  );
}

export default InfiniteScroll;
