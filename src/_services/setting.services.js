import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const  settingServices= {
    getWorkflow,
    createCompanyProfile,
    addWrokFlow,
    updateWorkFlow,
    removeWorkFlow,
    getRolesAndPermissions,
    getGroups,
    getUsers
}
function getWorkflow() {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.WORKFLOW}`, requestOptions).then(response => response);
}
function createCompanyProfile(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("POST", extraHeaders, JSON.stringify(data));
    return fetch(`${apiEndPoint.COMPANYPROFILE}`, requestOptions).then(response => response);
}
function addWrokFlow(data){
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("POST", extraHeaders, JSON.stringify(data));
    return fetch(`${apiEndPoint.WORKFLOW}`, requestOptions).then(response => response);
}
function updateWorkFlow(data){
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("POST", extraHeaders, JSON.stringify(data));
    return fetch(`${apiEndPoint.WORKFLOW}`, requestOptions).then(response => response);
}
function removeWorkFlow(data){
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("DELETE", extraHeaders, JSON.stringify(data));
    return fetch(`${apiEndPoint.WORKFLOW}`, requestOptions).then(response => response);
}
function getRolesAndPermissions(data){
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.ROLESANDPERMISSIONS}`, requestOptions).then(response => response);
}
function getGroups(data){
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.GROUPSLIST}`, requestOptions).then(response => response);
}
function getUsers(data){
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.USERSLIST}`, requestOptions).then(response => response);
}