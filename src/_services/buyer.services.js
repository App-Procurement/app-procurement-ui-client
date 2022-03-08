import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const buyerServices = {
    getBuyer,
    // updateBuyer
}


function getBuyer(id) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.BUYER}`, requestOptions).then(response => response.json());
}

// function updateBuyer(data) {
//     const extraHeaders = {
//         "Content-Type": "application/json"
//     };
//     const requestOptions = commonFunctions.getRequestOptions("PATCH", extraHeaders, null);
//     return fetch(`${apiEndPoint.BUYER}`, requestOptions).then(response => response.json());
// }