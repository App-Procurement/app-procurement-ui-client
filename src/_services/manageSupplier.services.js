import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const manageSupplierServices = {
  searchSupplierList,
  addSupplier,
  updateSupplierList,
  deleteSupplier,
};

function searchSupplierList(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null
  );
  return fetch(`${apiEndPoint.SUPPLIER}`, requestOptions).then((response) =>
    response.json()
  );
}

function updateSupplierList(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "PUT",
    extraHeaders,
    JSON.stringify(data)
  );
  return fetch(`${apiEndPoint.SUPPLIER}`, requestOptions).then((response) =>
    response.json()
  );
}
function deleteSupplier(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "Delete",
    extraHeaders,
    JSON.stringify(data)
  );
  return fetch(`${apiEndPoint.SUPPLIER}`, requestOptions).then((response) =>
    response.json()
  );
}

function addSupplier(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(data)
  );
  return fetch(`${apiEndPoint.SUPPLIER}`, requestOptions).then((response) =>
    response.json()
  );
}
