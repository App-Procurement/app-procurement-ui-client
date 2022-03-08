import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const authServices = {
    login,
}

function login(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("POST", extraHeaders, JSON.stringify(data), true);
    return fetch(`${apiEndPoint.LOGIN}`, requestOptions).then(response => response.json());
}
