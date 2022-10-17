import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const invoiceServices = {
  deleteInvoice,
  getInvoice,
  searchInvoice,
  getNewInvoice,
  invoicesData,
  addRequest,
};

function addRequest(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };

  // let submitData={formData:formData, otherData:JSON.stringify(data)}
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(data)
  );
  return fetch(`${apiEndPoint.INVOICES}`, requestOptions).then((response) =>
    response.json()
  );
}

//   here i need do post req
// function addRequest(data) {
//   const extraHeaders = {
//     "Content-Type": "application/json",
//   };
//   const requestOptions = commonFunctions.getRequestOptions(
//     "POST",
//     extraHeaders,
//     data
//   );
//   return fetch(`${apiEndPoint.INVOICES}`, requestOptions).then(
//     (response) => response
//   );
// }

function invoicesData(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders);
  return fetch(`${apiEndPoint.INVOICES}`, requestOptions).then(
    (response) => response
  );
}

function deleteInvoice(id) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "DELETE",
    extraHeaders,
    null
  );
  return fetch(`${apiEndPoint.INVOICE}/${id}`, requestOptions).then(
    (response) => response.json()
  );
}

function getInvoice(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null
  );
  return fetch(`${apiEndPoint.INVOICE}/${data.id}`, requestOptions).then(
    (response) => response
  );
}

function searchInvoice() {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null
  );
  return fetch(`${apiEndPoint.INVOICE}`, requestOptions).then(
    (response) => response
  );
}

function getNewInvoice() {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null
  );
  return fetch(`${apiEndPoint.NEWINVOICE}`, requestOptions).then((response) =>
    response.json()
  );
}
