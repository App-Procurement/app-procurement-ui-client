import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const kanbanServices = {
    fetchKanbanList,
}

function fetchKanbanList(data) {
    const extraHeaders = {
        "Content-Type": "application/json"
    }
    const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, null);
    return fetch(`${apiEndPoint.KANBAN}`, requestOptions).then(response => response.json());

}