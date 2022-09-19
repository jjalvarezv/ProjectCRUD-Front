import axios from "axios";
import { endpoints } from "../repositories/endpoints"

export const GetUserLogged = () => {
    const url = endpoints.getUser;
    const response = axios.get(url, { withCredentials: true })
        .then(response => {
            return response.status !== 204 ? true : false
        }).catch(e => {
            console.log(e);
            return false
        })
    return response
}