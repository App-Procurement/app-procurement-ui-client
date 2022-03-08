import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const vendorServices = {
    addVendor,
    fetchVendors,
    deleteVendors,
    vendorQuotation
}

function addVendor(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("POST", extraHeaders, JSON.stringify(data));
    return fetch(`${apiEndPoint.VENDOR}`, requestOptions).then(response => response.json());
}

function fetchVendors() {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.VENDOR}`, requestOptions).then(response => response.json());
}


function deleteVendors(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("DELETE", extraHeaders, null);
    return fetch(`${apiEndPoint.VENDOR}/${data.id}`, requestOptions).then(response => response.json());
}

function vendorQuotation(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.VENDORQUOTATION}`, requestOptions).then(response => response.json());
}
