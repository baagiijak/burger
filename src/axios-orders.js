import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-fe0be.firebaseio.com/",
});

export default instance;
