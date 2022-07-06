import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const purchaseOrderServices = {
    getPurchaseOrder,
    searchPurchaseOrder,
    addPurchaseOrder,
    approvePurchaseOrder,
    getApprovePo,
    approvePO,
    updatePurcahseOrder,
    deletePOListItem
}
function getPurchaseOrder(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.PURCHASEORDERS}/${data.id}`, requestOptions).then(response => response);
}
function deletePOListItem(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("DELETE", extraHeaders, JSON.stringify(data));
    return fetch(`${apiEndPoint.PURCHASEORDERS}/${data.id}`, requestOptions).then(response => response);
}
function searchPurchaseOrder(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.PURCHASEORDERS}`, requestOptions).then(response => response);
}

function addPurchaseOrder(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("POST", extraHeaders, JSON.stringify(data));
    return fetch(`${apiEndPoint.PURCHASEORDERS}`, requestOptions).then(response => response);
}

function approvePurchaseOrder(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.PURCHASEORDERS}`, requestOptions).then(response => response);
}

function approvePO(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("POST", extraHeaders, JSON.stringify(data));
    return fetch(`${apiEndPoint.PURCHASEORDERS}/approve/${data.id}`, requestOptions).then(response => response.json());
}
function getApprovePo(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.PURCHASEORDERS}/approve/${data.id}`, requestOptions).then(response => response.json());
}

function updatePurcahseOrder(data){
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("POST", extraHeaders, JSON.stringify(data));
    return fetch(`${apiEndPoint.PURCHASEORDERS}/${data.id}`, requestOptions).then(response => response.json());
}