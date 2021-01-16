import axios from "axios";

const api = axios.create({
  baseURL: "https://downtomeet-api.herokuapp.com/",
});

export default api;
