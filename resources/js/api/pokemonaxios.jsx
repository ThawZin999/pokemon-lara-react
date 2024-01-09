import Axios from "axios";

const axios = Axios.create({
  headers: {
    "X-Api-Key": "4bbd6c39-e4cc-49cf-aaaa-c8501e618fb8",
  },
  params: {
    pageSize: 20,
  },
});

export default axios;
