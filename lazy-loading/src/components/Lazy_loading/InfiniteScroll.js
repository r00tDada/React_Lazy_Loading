import React, { useState, useEffect } from "react";
import Display from "./Display";
import styles from "./LazyImageLoading.module.css";
import axios from "axios";
import useLazyImageLoading from "../hooks/useLazyImageLoading";

const initialState = {
  query: "",
  photos: [],
  page: 1,
  perPage: 30,
};

function InfiniteScroll() {
  const [photosData, setPhotosData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(null);

  const fetchingAPI = () => {
    const { query, page, perPage } = photosData;
    if (query === "") return;
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
          let currData = data.data.results;
          // console.log(currData);
          setPhotosData((prev) => {
            return {
              ...prev,
              photos:
                page === 1 ? [...currData] : prev.photos.concat([...currData]),
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
    fetchingAPI();
  }, [isLoading]);

  useEffect(() => {
    const scroll = window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        setIsLoading(true);
      }
    });
    return () => {
      window.addEventListener("scroll", scroll);
    };
  }, []);

  useEffect(() => {
    fetchingAPI();
  }, [photosData.query]);

  function inputHandler(event) {
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      setPhotosData({
        query: event.target.value,
        photos: [],
        page: 1,
        perPage: 30,
      });
    }, 500);
    setTimer(newTimer);
  }

  return (
    <>
      <div className={styles.heading}>
        <h1>Image Lazy Loading and Infinite Scrolling</h1>
      </div>
      <div className={styles.inputBox}>
        <input type="text" onChange={inputHandler}></input>
      </div>
      <div className={styles.container}>
        {photosData.photos.map((item) => {
          return <Display key={item.id} items={item} />;
        })}
      </div>
    </>
  );
}

export default InfiniteScroll;
