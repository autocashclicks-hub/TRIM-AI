import axios from "axios";

const api = axios.create({
  baseURL: "https://perspectives-members-wave-closure.trycloudflare.com",
});

export default api;