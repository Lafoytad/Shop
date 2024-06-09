import axios from "axios";

const httpClient = axios.create({
    baseURL: "https://fakestoreapi.com/",
    timeout: 60000,
});

export default httpClient;
