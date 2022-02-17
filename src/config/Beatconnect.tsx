import axios from "axios";
import {API_URL, API_TOKEN} from "@env"

const Beatconnect = axios.create({
    baseURL: API_URL,
    headers: {
        Token: API_TOKEN
    },
    method: "GET"
});

export default Beatconnect;