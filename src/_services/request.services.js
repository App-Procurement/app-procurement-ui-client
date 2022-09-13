import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const requestServices = {
    getRequestData,
}

function getRequestData(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, "", '');
    return fetch(`${apiEndPoint.REQUESTDATA}/${data}`, requestOptions).then(response => response);
}
