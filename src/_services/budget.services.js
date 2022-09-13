import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const BudgetServices = {
    getBudgetData,
}

function getBudgetData(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    };
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, "", '');
    return fetch(`${apiEndPoint.BUDGETDATA}`, requestOptions).then(response => response);
}
