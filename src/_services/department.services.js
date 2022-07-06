import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const departmentServices = {
    getDepartment,
}

function getDepartment() {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.DEPARTMENT}`, requestOptions).then(response => response.json());
}