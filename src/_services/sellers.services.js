import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const manageSellerServices = {
  getSellerList,
};

function getSellerList(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null
  );
  return fetch(`${apiEndPoint.SELLER}`, requestOptions).then((response) =>
    response.json()
  );
}
