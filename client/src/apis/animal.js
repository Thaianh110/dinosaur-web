import axios from "../axios";

export const apiGetAnimals = (params) => axios({
    url: "/animal/",
    method: "get",
    params
  });
