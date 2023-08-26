import axios from "axios";

const service = axios.create();
const baseURL = process.env.REACT_APP_API_URL;

const get = (path, params, callback, errorHandler) => {
  return service
    .request({
      method: "GET",
      url: baseURL + path,
      responseType: "json",
      params,
    })
    .then((response) => {
      if (response) callback(response.status, response.data);
    })
    .catch((error) => {
      console.log(`Error fetching ${path}:`, error.response.statusText);
      errorHandler(error.response.status);
    });
};

export { get };
