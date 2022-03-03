import axios from "axios";
import { useState, useEffect } from "react";
const API_URL = "https://api.unsplash.com/search/photos?";

const initialState = {
  loading: true,
  data: {},
  error: "",
};

function FetchingData(query) {
  const [state, setState] = useState(initialState);
  useEffect(() => {
    axios
      .get(
        `${API_URL}query=${query}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}&per_page=30`
      )
      .then((response) => {
        setState({ loading: false, data: response.data.results, error: "" });
      })
      .catch((error) => {
        console.log(error);
        setState({ loading: false, data: {}, error: "something went wrong" });
      });
  }, []);
  return [state.loading, state.data, state.error];
}

export default FetchingData;
