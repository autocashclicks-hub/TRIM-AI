import axios from "axios";

const api = axios.create({
  baseURL: "https://compliance-drain-love-necessarily.trycloudflare.com",
});

export default api;