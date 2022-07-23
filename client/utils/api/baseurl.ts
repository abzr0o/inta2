import axios from "axios";

const baseurl = axios.create({
  baseURL: "https://instass1111.herokuapp.com/api/v1",
  withCredentials: true,
});

export default baseurl;
