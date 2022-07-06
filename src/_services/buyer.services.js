import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const buyerServices = {
    getBuyer,
    // updateBuyer
}


function getBuyer(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.BUYER}`, requestOptions).then(response => response);
}

// function updateBuyer(data) {
//     const extraHeaders = {
//         "Content-Type": "application/json"
//     };
//     const requestOptions = commonFunctions.getRequestOptions("PATCH", extraHeaders, null);
//     return fetch(`${apiEndPoint.BUYER}`, requestOptions).then(response => response.json());
// }