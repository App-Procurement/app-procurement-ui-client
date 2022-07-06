import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const recievedrfpServices = {
    searchRecievedRFP,
    getRecieveRFP,
    addRecieveRFP,
    searchRecievedRFQ,
    getRecieveRFQ,
    addRecieveRFQ,
    getTrackRfpData,
    sendRFQ,
    getActivites
    
}
function searchRecievedRFP(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.RFP}`, requestOptions).then(response => response.json());
}

function getRecieveRFP(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.RFP}/${data.id}`, requestOptions).then(response => response.json());
}

function addRecieveRFP(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("POST", extraHeaders, JSON.stringify(data));
    return fetch(`${apiEndPoint.RFP}`, requestOptions).then(response => response.json());
}

function searchRecievedRFQ() {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.RFQ}`, requestOptions).then(response => response.json());
}

function getRecieveRFQ(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.RFQ}/${data.id}`, requestOptions).then(response => response.json());
}

function addRecieveRFQ(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("POST", extraHeaders, JSON.stringify(data));
    return fetch(`${apiEndPoint.RFQ}`, requestOptions).then(response => response.json());
}

function getTrackRfpData(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.TRACKFRPDATA}/${data.id}`, requestOptions).then(response => response.json());
}


function sendRFQ(data){
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.SENDRFQ}/`, requestOptions).then(response => response.json());
}

function getActivites(data){
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.ACTIVITES}`, requestOptions).then(response => response.json());
}