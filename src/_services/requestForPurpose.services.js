import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const requestForPurposeServices = {
  getRequestList,
  UploadFile,
  UploadFileUrlUpdate,
  getRequest,
  getItemList,
  removeRequest,
  addRequest,
  SupplierAndCategoryList,
  updateRequestList,
  getProductsList,
  addProductsList,
};

function getRequestList(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null
  );
  return fetch(
    `${apiEndPoint.REQUESTFORPURPOSE}`,
    requestOptions
  ).then((response) => response.json());
}

function SupplierAndCategoryList(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null
  );
  return fetch(
    `${apiEndPoint.SUPPLIERANDCATEGORY}`,
    requestOptions
  ).then((response) => response.json());
}

function addRequest(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  let submitData = { data };
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(submitData.data)
  );
  return fetch(`${apiEndPoint.REQUESTFORPURPOSE}`, requestOptions).then(
    (response) => {
      return response.json();
    }
  );
}

function removeRequest(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "delete",
    extraHeaders,
    JSON.stringify(data)
  );
  return fetch(
    `${apiEndPoint.REQUESTFORPURPOSE}/${data.id}`,
    requestOptions
  ).then((response) => response.json());
}

function getRequest(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null
  );
  return fetch(
    `${apiEndPoint.REQUESTFORPURPOSE}/${data.id}`,
    requestOptions
  ).then((response) => response.json());
}

function updateRequestList(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(data)
  );
  return fetch(
    `${apiEndPoint.REQUESTFORPURPOSE}/${data.id}`,
    requestOptions
  ).then((response) => response.json());
}

function UploadFile(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null
  );
  return fetch(
    `https://0f46r83d5a.execute-api.us-east-1.amazonaws.com/documents/upload?path=${data}`,
    requestOptions
  ).then((response) => response);
}

function UploadFileUrlUpdate(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  let formData = new FormData();
  formData.append("upload-file", data.files);
  const requestOptions = commonFunctions.getRequestOptions(
    "PUT",
    extraHeaders,
    formData
  );
  return fetch(`${data.url}`, requestOptions).then((response) => response);
}

function getItemList() {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null
  );
  return fetch(`${apiEndPoint.ITEMLIST}`, requestOptions).then((response) =>
    response.json()
  );
}

function getProductsList() {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null
  );
  return fetch(`${apiEndPoint.PRODUCTSLIST}`, requestOptions).then((response) =>
    response.json()
  );
}

function addProductsList(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    data
  );
  return fetch(`${apiEndPoint.PRODUCTSLIST}`, requestOptions).then((response) =>
    response.json()
  );
}
