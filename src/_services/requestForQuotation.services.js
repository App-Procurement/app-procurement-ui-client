import { commonFunctions } from "../_utilities";
import { apiEndPoint } from "./apiEndPoint";

export const requestForQuotataionServices = {
  getRequestQuotationData,
  createRfq,
  rfqQuotationPost
};


function getRequestQuotationData(data) {
    const extraHeaders = {
      "Content-Type": "application/json"
  };
  const requestOptions = commonFunctions.getRequestOptions("GET", extraHeaders, "", '');
  return fetch(`${apiEndPoint.REQUESTFORQUOTATION}`, requestOptions).then(response => response);

  }


  function createRfq(data) {
    const extraHeaders = {
      'Content-Type': 'application/json'
    };
    const requestOptions = commonFunctions.getRequestOptions('POST', extraHeaders, JSON.stringify(data));
    return fetch(`${apiEndPoint.REQUESTFORQUOTATION}`, requestOptions).then((response) => response.json());
  }

  function rfqQuotationPost(data) {
    const extraHeaders = {
      'Content-Type': 'application/json'
    };
    const requestOptions = commonFunctions.getRequestOptions('POST', extraHeaders, JSON.stringify(data));
    return fetch(`${apiEndPoint.REQUESTFORQUOTATION}`, requestOptions).then((response) => response.json());
  }