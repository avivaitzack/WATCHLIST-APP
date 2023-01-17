import axios from "axios";

export async function getData() {
  try {
    const response = await axios.get(`https://api.tvmaze.com/shows`);
    return response;
  } catch (error) {
    return error;
  }
}

export async function getSearchedData(text) {
  try {
    const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${text}`);
    return response;
  } catch (error) {
    return error;
  }
}