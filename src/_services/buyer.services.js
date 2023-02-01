import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const buyerServices = {
  getBuyer,
};

function getBuyer(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null
  );
  return fetch(`${apiEndPoint.BUYER}`, requestOptions).then(
    (response) => response
  );
}
