import axios from "axios";

const api = axios.create({
  baseURL: "https://empty-athletes-trainer-classics.trycloudflare.com",
});

export default api;