import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const reportServices = {
    fetchReportsList,
}

function fetchReportsList(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    }
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.REPORTS}`, requestOptions).then(response => response.json());

}