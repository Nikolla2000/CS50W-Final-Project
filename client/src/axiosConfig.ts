import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8000', //development server url
//   baseURL: '', //production server url
})

export default api;