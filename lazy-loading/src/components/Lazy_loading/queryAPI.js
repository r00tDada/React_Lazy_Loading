import { UNSPLASH_CLIENT_ID } from "./config";
import axios from "axios";

const API_URL = "https://api.unsplash.com/search/photos?";
export const queryAPI = (query) =>
  axios
    .get(`${API_URL}query=${query}&client_id=${UNSPLASH_CLIENT_ID}&per_page=30`)
    .then((response) => {
      return {
        status: true,
        data: response.data.results,
      };
    })
    .catch((error) => {
      return {
        status: false,
        data: "",
      };
    });
