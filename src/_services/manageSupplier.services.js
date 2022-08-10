import { commonFunctions } from '../_utilities';
import { apiEndPoint } from './apiEndPoint';

export const manageSupplierServices = {
	getSupplierList,
	getProductList,
	deleteProduct,
	updateProductList,
	getActiveSupplierList,
	updateActiveSupplierList,
	deleteActiveSupplier,
	addSupplier,
	getSupplierDetail,
	addProduct,
	updateSupplierList,
	deleteSupplier
};

function getSupplierList(data) {
	const extraHeaders = {
		'Content-Type': 'application/json'
	};
	const requestOptions = commonFunctions.getRequestOptions('GET', extraHeaders, null);
	return fetch(`${apiEndPoint.SUPPLIER}`, requestOptions).then((response) => response.json());
}
function updateSupplierList(data) {
	const extraHeaders = {
		'Content-Type': 'application/json'
	};
	const requestOptions = commonFunctions.getRequestOptions('DELETE', extraHeaders, JSON.stringify(data));
	return fetch(`${apiEndPoint.SUPPLIER}`, requestOptions).then((response) => response.json());
}
function deleteSupplier(data) {
	const extraHeaders = {
		'Content-Type': 'application/json'
	};
	const requestOptions = commonFunctions.getRequestOptions('Delete', extraHeaders, JSON.stringify(data));
	return fetch(`${apiEndPoint.SUPPLIER}`, requestOptions).then((response) => response.json());
}
function getProductList(data) {
	const extraHeaders = {
		'Content-Type': 'application/json'
	};
	const requestOptions = commonFunctions.getRequestOptions('GET', extraHeaders, null);
	return fetch(`${apiEndPoint.SUPPLIERPRODUCT}`, requestOptions).then((response) => response.json());
}
function deleteProduct(data) {
	const extraHeaders = {
		'Content-Type': 'application/json'
	};
	const requestOptions = commonFunctions.getRequestOptions('DELETE', extraHeaders, JSON.stringify(data));
	return fetch(`${apiEndPoint.SUPPLIERPRODUCT}`, requestOptions).then((response) => response.json());
}
function updateProductList(data) {
	const extraHeaders = {
		'Content-Type': 'application/json'
	};
	const requestOptions = commonFunctions.getRequestOptions('POST', extraHeaders, JSON.stringify(data));
	return fetch(`${apiEndPoint.SUPPLIERPRODUCT}`, requestOptions).then((response) => response.json());
}
function getActiveSupplierList(data) {
	const extraHeaders = {
		'Content-Type': 'application/json'
	};
	const requestOptions = commonFunctions.getRequestOptions('GET', extraHeaders, null);
	return fetch(`${apiEndPoint.SUPPLIER}`, requestOptions).then((response) => response.json());
}

function updateActiveSupplierList(data) {
	const extraHeaders = {
		'Content-Type': 'application/json'
	};
	const requestOptions = commonFunctions.getRequestOptions('POST', extraHeaders, JSON.stringify(data));
	return fetch(`${apiEndPoint.SUPPLIER}`, requestOptions).then((response) => response.json());
}
function deleteActiveSupplier(data) {
	const extraHeaders = {
		'Content-Type': 'application/json'
	};
	const requestOptions = commonFunctions.getRequestOptions('Delete', extraHeaders, JSON.stringify(data));
	return fetch(`${apiEndPoint.SUPPLIER}`, requestOptions).then((response) => response.json());
}
function addSupplier(data) {
	const extraHeaders = {
		'Content-Type': 'application/json'
	};
	const requestOptions = commonFunctions.getRequestOptions('POST', extraHeaders, JSON.stringify(data));
	return fetch(`${apiEndPoint.SUPPLIER}`, requestOptions).then((response) => response.json());
}

function getSupplierDetail(data) {
	const extraHeaders = {
		'Content-Type': 'application/json'
	};
	const requestOptions = commonFunctions.getRequestOptions('GET', extraHeaders, null);
	return fetch(`${apiEndPoint.SUPPLIER}/${data.id}`, requestOptions).then((response) => response.json());
}

function addProduct(data) {
	const extraHeaders = {
		'Content-Type': 'application/json'
	};
	const requestOptions = commonFunctions.getRequestOptions('POST', extraHeaders, data);
	return fetch(`${apiEndPoint.SUPPLIERPRODUCT}`, requestOptions).then((response) => response.json());
}
