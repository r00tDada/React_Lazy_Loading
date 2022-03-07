import React, { useState, useEffect, useRef } from "react";
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

  const loading = useRef(true);

  const fetchingAPI = (query, page, perPage) => {
    loading.current = true;
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
        if (!loading.current) {
          return;
        }
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
          loading.current = false;
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
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (
      !loading.current &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 300
    ) {
      setPhotosData((prev) => {
        fetchingAPI(prev.query, prev.page + 1, 30);
        return {
          ...prev,
          page: prev.page + 1,
        };
      });
    }
  };

  function inputHandler(event) {
    let q = event.target.value;
    setPhotosData({
      query: q,
      photos: [],
      page: 1,
      perPage: 30,
    });
    fetchingAPI(q, 1, 30);
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
