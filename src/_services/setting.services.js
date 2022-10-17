import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const settingServices = {
  getWorkflow,
  createCompanyProfile,
  addWrokFlow,
  updateWorkFlow,
  removeWorkFlow,
  getRolesAndPermissions,
  getGroups,
  getUsers,
  getPreferences,
  getAllSettingGroupData,
  updateSuperAdminUsers,
};
function getWorkflow() {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null
  );
  return fetch(`${apiEndPoint.WORKFLOW}`, requestOptions).then(
    (response) => response
  );
}
function createCompanyProfile(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(data)
  );
  return fetch(`${apiEndPoint.COMPANYPROFILE}`, requestOptions).then(
    (response) => response
  );
}
function addWrokFlow(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(data)
  );
  return fetch(`${apiEndPoint.WORKFLOW}`, requestOptions).then(
    (response) => response
  );
}
function updateWorkFlow(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(data)
  );
  return fetch(`${apiEndPoint.WORKFLOW}`, requestOptions).then(
    (response) => response
  );
}
function updateSuperAdminUsers(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "PUT",
    extraHeaders,
    JSON.stringify(data)
  );
  return fetch(`${apiEndPoint.SETTINGGROUPDATA}`, requestOptions).then(
    (response) => response
  );
}
function removeWorkFlow(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "DELETE",
    extraHeaders,
    JSON.stringify(data)
  );
  return fetch(`${apiEndPoint.WORKFLOW}`, requestOptions).then(
    (response) => response
  );
}
function getRolesAndPermissions(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null
  );
  return fetch(`${apiEndPoint.ROLESANDPERMISSIONS}`, requestOptions).then(
    (response) => response
  );
}
function getGroups(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null
  );
  return fetch(`${apiEndPoint.GROUPSLIST}`, requestOptions).then(
    (response) => response
  );
}
function getUsers(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null
  );
  return fetch(`${apiEndPoint.USERSLIST}`, requestOptions).then(
    (response) => response
  );
}
function getPreferences() {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null
  );
  return fetch(`${apiEndPoint.PREFERENCESLIST}`, requestOptions).then(
    (response) => response
  );
}

function getAllSettingGroupData(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null
  );
  return fetch(`${apiEndPoint.SETTINGGROUPDATA}`, requestOptions).then(
    (response) => response
  );
}
