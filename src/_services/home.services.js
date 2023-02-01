// import config from '../config';
import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";
export const homeServices = {
  Dashboarddata,
  Notificationdata,
};

function Dashboarddata() {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null
  );
  return fetch(
    `${apiEndPoint.DASHBOARDDATA}`,
    requestOptions
  ).then((response) => response.json());
}

function Notificationdata() {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null
  );
  return fetch(
    `${apiEndPoint.NOTIFICATIONS}`,
    requestOptions
  ).then((response) => response.json());
}
