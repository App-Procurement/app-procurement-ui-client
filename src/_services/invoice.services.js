import config from '../config';
import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const invoiceServices = {
    deleteInvoice,
    getInvoice,
    searchInvoice,
    getNewInvoice
}

function deleteInvoice(id) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("DELETE", extraHeaders, null);
    return fetch(`${apiEndPoint.INVOICE}/${id}`, requestOptions).then(response => response.json());
}

function getInvoice(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.INVOICE}/${data.id}`, requestOptions).then(response => response.json());
}

function searchInvoice() {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.INVOICE}`, requestOptions).then(response => response.json());
}

function getNewInvoice() {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.NEWINVOICE}`, requestOptions).then(response => response.json());
}
