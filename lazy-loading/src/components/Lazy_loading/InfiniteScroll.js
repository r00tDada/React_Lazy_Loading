import React, { useState, useEffect } from "react";
import Display from "./Display";
import styles from "./LazyImageLoading.module.css";
import axios from "axios";
import useLazyImageLoading from "../hooks/useLazyImageLoading";

function InfiniteScroll() {
  const [photosData, setPhotosData] = useState({
    query: "",
    photos: [],
    page: 1,
    perPage: 30,
  });

  const [isLoading, setIsLoading] = useState(true);

  const fetchingAPI = (query, page, perPage) => {
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
              page: prev.page + 1,
            };
          });
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useLazyImageLoading({
    threshold: 0.5,
    root: null,
  });

  useEffect(() => {
    if (!isLoading) return;
    fetchingAPI(photosData.query, photosData.page, photosData.perPage);
  }, [isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchingAPI(photosData.query, photosData.page, 30);
  }, [photosData.query]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 300
    ) {
      setIsLoading(true);
    }
  };

  function inputHandler(event) {
    setPhotosData({
      query: event.target.value,
      photos: [],
      page: 1,
      perPage: 30,
    });
  }

  return (
    <>
      <div className={styles.heading}>
        <h1>Image Lazy Loading</h1>
      </div>
      <input
        type="text"
        onChange={inputHandler}
        className={styles.inputbox}
      ></input>
      <div>
        {photosData.photos.map((item, index) => {
          return <Display key={index} items={item} />;
        })}
      </div>
    </>
  );
}

export default InfiniteScroll;
