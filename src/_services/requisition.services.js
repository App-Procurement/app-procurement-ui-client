import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const requisitionServices = {
    addRequisition,
    deleteRequisition,
    getRequisitions,
    getRequisition,
    editRequisition,
    getCurrency,
    approveRequisition,
    setRequisitionBuyers
}

function addRequisition(data) {
    const formData = new FormData();
    if (data.requisitionFile) {
        for (let i = 0; i < data.requisitionFile.length; i++) {
            formData.append("requisitionFile", data.requisitionFile[i]);
        }
    }
    if (data.requisitionLineItemFile && data.requisitionLineItemFile.length > 0) {
        for (let i = 0; i < data.requisitionLineItemFile.length; i++) {
            formData.append("requisitionLineItemFile", data.requisitionLineItemFile[i]);
        }
    }
    formData.append("obj", JSON.stringify(data.obj));
    const requestOptions = commonFunctions.getRequestOptions("POST", {}, formData);
    return fetch(`${apiEndPoint.REQUISTIONS}`, requestOptions).then(response => response.json());
}

function deleteRequisition(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("DELETE", extraHeaders, null);
    return fetch(`${apiEndPoint.REQUISTIONS}/${data.id}`, requestOptions).then(response => response.json());
}

function getRequisitions(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    let url = "";
    if (data) {
        if (data.status) {
            url += `?status=${data.status}`;
        }
        if (data.requisitionNo) {
            url += `${url ? '&' : '?'}id=${data.requisitionNo}`;
        }
        if (data.department) {
            url += `${url ? '&' : '?'}departmentId=${data.department}`;
        }
        if (data.toDate) {
            url += `${url ? '&' : '?'}toDate=${data.toDate}`;
        }
        if (data.fromDate) {
            url += `${url ? '&' : '?'}fromDate=${data.fromDate}`;
        }
    }
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.REQUISTIONS}${url}`, requestOptions).then(response => response.json());
}

function editRequisition(data) {
    const formData = new FormData();
    if (data.requisitionFile) {
        for (let i = 0; i < data.requisitionFile.length; i++) {
            formData.append("requisitionFile", data.requisitionFile[i]);
        }
    }
    if (data.requisitionLineItemFile && data.requisitionLineItemFile.length > 0) {
        for (let i = 0; i < data.requisitionLineItemFile.length; i++) {
            formData.append("requisitionLineItemFile", data.requisitionLineItemFile[i]);
        }
    }
    formData.append("obj", JSON.stringify(data.obj));
    const requestOptions = commonFunctions.getRequestOptions("PUT", {}, formData);
    return fetch(`${apiEndPoint.REQUISTIONS}`, requestOptions).then(response => response.json());
}

function getRequisition(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.REQUISTIONS}/${data.id}`, requestOptions).then(response => response.json());
}

function getCurrency(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.CURRENCY}`, requestOptions).then(response => response.json());
}

function approveRequisition(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("POST", extraHeaders, JSON.stringify(data));
    return fetch(`${apiEndPoint.REQUISTIONS}/approve`, requestOptions).then(response => response.json());
}

function setRequisitionBuyers(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("POST", extraHeaders, JSON.stringify(data));
    return fetch(`${apiEndPoint.BUYER}/${data.requisitionID}`, requestOptions).then(response => response.json());
}