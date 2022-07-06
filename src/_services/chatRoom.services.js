import { apiEndPoint } from "./apiEndPoint";
import { commonFunctions } from "../_utilities";

export const chatRoomServices = { getChats, getMembersList, createChatRoom };

function getChats(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    JSON.stringify(data),
    null
  );
  return fetch(`${apiEndPoint.GETCHATS}`, requestOptions).then((response) =>
    response.json()
  );
}

function getMembersList(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    JSON.stringify(data),
    null
  );
  return fetch(`${apiEndPoint.GETMEMBERS}`, requestOptions).then((response) =>
    response.json()
  );
}

function createChatRoom(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(data),
    null
  );
  return fetch(`${apiEndPoint.CREATECHATROOM}`, requestOptions).then(
    (response) => response.json()
  );
}
