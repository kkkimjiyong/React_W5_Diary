import axios, { AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
  baseURL: "BASE_URL",
};
const client = axios.create(axiosConfig); // client: AxiosInstance

const response = await client.get("/user");
const response = await client.post("/user/add", { id: "mo", name: "mocci" });
