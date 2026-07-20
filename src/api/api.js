import axios from "axios";

const api = axios.create({
  baseURL: "https://hunting-naples-competent-connectors.trycloudflare.com",
});

export default api;