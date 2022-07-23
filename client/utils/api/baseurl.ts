import axios from "axios";

const baseurl = axios.create({
  baseURL: "http://localhost:2000/api/v1",
  withCredentials: true,
});

export default baseurl;
