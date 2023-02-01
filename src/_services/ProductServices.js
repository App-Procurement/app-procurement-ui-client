import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const ProductServices = {
  searchProductList,
  addProduct,
  deleteProduct,
};

function searchProductList(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null
  );
  return fetch(`${apiEndPoint.PRODUCT}`, requestOptions).then((response) =>
    response.json()
  );
}

function deleteProduct(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "DELETE",
    extraHeaders,
    JSON.stringify(data)
  );
  return fetch(`${apiEndPoint.PRODUCT}`, requestOptions).then(
    (response) => response
  );
}

function addProduct(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(data)
  );
  return fetch(`${apiEndPoint.PRODUCT}`, requestOptions).then(
    (response) => response
  );
}
