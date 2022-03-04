import axios from "axios";
import { useState, useEffect } from "react";

function FetchingData(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setData([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios({
      method: "GET",
      url: "https://api.unsplash.com/search/photos",
      params: {
        query: query,
        page: pageNumber,
        client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
        per_page: 30,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) => {
        const resp = response.data.results;
        for (let img of resp) {
          setData((prevData) => {
            return [...prevData, img];
          });
        }
        setLoading(false);
        setError(false);
        setHasMore(resp.length > 0);
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        setError(true);
        setLoading(false);
      });

    return () => cancel();
  }, [query, pageNumber]);

  return [
    loading,
    data,
    error,
    hasMore,
    setLoading,
    setData,
    setError,
    setHasMore,
  ];
}

export default FetchingData;
