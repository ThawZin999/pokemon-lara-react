import Axios from "axios";

const axios = Axios.create({
  headers: {
    "X-Api-Key": "4bbd6c39-e4cc-49cf-aaaa-c8501e618fb8",
  },
  params: {
    pageSize: 50,
  },
});

export default axios;
