import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const accountServices = {
    addAccount
}

function addAccount(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("POST", extraHeaders,JSON.stringify(data) );
    return fetch(`${apiEndPoint.COMMITTEE}`, requestOptions).then(response => response.json());
}
