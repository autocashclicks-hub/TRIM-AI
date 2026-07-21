import axios from "axios";

const api = axios.create({
  baseURL: "https://roster-achievement-belief-capable.trycloudflare.com",
});

export default api;