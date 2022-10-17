import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const kanbanServices = {
  fetchKanbanList,
  addKanban,
  updateKanban,
};

function fetchKanbanList(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null
  );
  return fetch(`${apiEndPoint.KANBAN}`, requestOptions).then((response) =>
    response.json()
  );
}

function addKanban(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };

  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    data
  );
  return fetch(`${apiEndPoint.KANBAN}`, requestOptions).then((response) =>
    response.json()
  );
}

function updateKanban(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };

  const requestOptions = commonFunctions.getRequestOptions(
    "PUT",
    extraHeaders,
    data
  );
  return fetch(`${apiEndPoint.KANBAN}`, requestOptions).then((response) =>
    response.json()
  );
}
