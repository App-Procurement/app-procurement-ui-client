// import config from '../config';
import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const committeeServices = {
    addCommittee,
    searchCommittee,
    getCommitteeType,
    searchCommitteeMembers,
}

function searchCommittee() {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.COMMITTEE}`, requestOptions).then(response => response.json());
}
function searchCommitteeMembers() {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.COMMITTEEMEMBERS}`, requestOptions).then(response => response.json());
}

function addCommittee(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("POST", extraHeaders,JSON.stringify(data) );
    return fetch(`${apiEndPoint.COMMITTEE}`, requestOptions).then(response => response.json());
}

function getCommitteeType() {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.COMMITTEE}`, requestOptions).then(response => response.json());
}
