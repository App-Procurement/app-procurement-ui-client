import { store } from '../_store';
export const commonFunctions = {
    getRequestOptions,
    convertDateToString,
    validateEmail,
    validateNumeric,
    getJsonFromUrl,
    onLogout,
    getAccessToken,
    getFileName,
}

function getRequestOptions(type, extraHeaders, body, bNoToken) {
    let authHeader = {};
    if (!bNoToken) {
        const currentState = store.getState();
        const userInfo = currentState.procurement.user;
        const accessToken = userInfo ? userInfo.token : null;
        authHeader = {
            Authorization: `Bearer ${accessToken}`
        }
    }
    let requestOptions = {
        method: type,
        headers: {
            ...extraHeaders,
            ...authHeader
        }
    };
    if (body) {
        requestOptions['body'] = body;
    }
    return requestOptions;
}

function getAccessToken() {
    const currentState = store.getState();
    const userInfo = currentState.procurement.user;
    const accessToken = userInfo ? userInfo.token : null;
    return accessToken;
}

function convertDateToString(dateObj) {
    if (dateObj && !isNaN(dateObj)) {
        let month = (dateObj.getMonth() + 1).toString();
        month = month.length === 1 ? '0' + month : month;
        let date = dateObj.getDate().toString();
        date = date.length === 1 ? '0' + date : date;
        let year = dateObj.getFullYear().toString();
        return `${year}-${month}-${date}`;
    }
    return "";
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}



function validateNumeric(number) {
    return /^\d+$/.test(number);
}

function getJsonFromUrl(url) {
    var result = {};
    if (url) {
        var query = url.substr(1);
        query.split("&").forEach(function (part) {
            var item = part.split("=");
            result[item[0]] = decodeURIComponent(item[1]);
        });
    }
    return result;
}

function onLogout() {
    let language = localStorage.getItem("language");
    localStorage.clear();
    if (!language) {
        language = "en";
    }
    localStorage.setItem("language", language);
}

function getFileName(header, type) {
    let fileName = 'downloaded.' + type;
    if (header) {
        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        var matches = filenameRegex.exec(header);
        if (matches != null && matches[1]) { 
            fileName = matches[1].replace(/['"]/g, '');
        }
    }
    return fileName;
}