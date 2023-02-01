import { apiEndPoint } from "./apiEndPoint";
import { commonFunctions } from "../_utilities";
export const emailServices = {
  recentCommunication,
  searchallemails,
  sendEmail,
  getEmailDetail,
  deleteEmail,
  readEmail,
};

function recentCommunication(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null
  );
  return fetch(`${apiEndPoint.CHATS}`, requestOptions).then((response) =>
    response.json()
  );
}

function searchallemails(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  let url = "?from=jkgoyal85@gmail.com";
  // url += `?search=${data.search}`;
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null
  );
  return fetch(`${apiEndPoint.EMAIL}${url}`, requestOptions).then((response) =>
    response.json()
  );
}

function sendEmail(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(data)
  );
  return fetch(`${apiEndPoint.EMAIL}`, requestOptions).then((response) =>
    response.json()
  );
}

function getEmailDetail(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null
  );
  return fetch(
    `${apiEndPoint.EMAIL}/${data.id}`,
    requestOptions
  ).then((response) => response.json());
}

function deleteEmail(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "DELETE",
    extraHeaders,
    null
  );
  return fetch(
    `${apiEndPoint.EMAIL}/${data.id}`,
    requestOptions
  ).then((response) => response.json());
}
function readEmail(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(data)
  );
  return fetch(
    `${apiEndPoint.EMAIL}/${data.id}`,
    requestOptions
  ).then((response) => response.json());
}
