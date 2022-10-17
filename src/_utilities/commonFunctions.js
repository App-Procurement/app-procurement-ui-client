import { store } from "../_store";
export const commonFunctions = {
  getRequestOptions,
  convertDateToString,
  validateEmail,
  validateNumeric,
  getJsonFromUrl,
  onLogout,
  getAccessToken,
  getFileName,
  timeStampFormat,
  timeStampMonthAndYear,
  estimatedMonth,
  dateTimeAndYear,
  timeDifference,
};

function timeDifference(date) {
  if (typeof date !== "object") {
    date = new Date(date);
  }

  var seconds = Math.floor(Math.abs((new Date() - date) / 1000));
  var intervalType;

  var interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = "year";
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = "month";
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = "day";
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = "hour";
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = "minute";
          } else {
            interval = seconds;
            intervalType = "second";
          }
        }
      }
    }
  }

  if (interval > 1 || interval === 0) {
    intervalType += "s";
  }

  return interval + " " + intervalType;
}

function getRequestOptions(type, extraHeaders, body, bNoToken) {
  let authHeader = {};
  if (!bNoToken) {
    const currentState = store.getState();
    const userInfo = currentState.procurement.user;
    const accessToken = userInfo ? userInfo.token : null;
    // let token = 'eyJraWQiOiJjXC80eWtTeWVzbHo3UkZXY2E0VDlpa2ZEYTl0Wmo5cmdFWUN5V3ZhdGhJYz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMjU5OTUzYy1iOGFlLTQ3MzAtYTgxYi1mN2NkNWI2MWRjZGIiLCJjb2duaXRvOmdyb3VwcyI6WyJkZWZhdWx0IiwiQWRtaW5zIl0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX1IxY2F1VXBMbSIsImNsaWVudF9pZCI6IjcyYzJ2dG05bnUxOGh2YjFlNXU4YmZqY2RsIiwib3JpZ2luX2p0aSI6Ijk3ZTE0MGFmLWU2NDQtNDc5My05ZmI4LWU0NzE2YmJlMmVlNSIsImV2ZW50X2lkIjoiNjQwZDJmNGMtMWVhNy00YzAwLWI4OTgtNTU5YTU3N2IyNzkyIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY1MzU0NDQ5MSwiZXhwIjoxNjUzNjMwODkxLCJpYXQiOjE2NTM1NDQ0OTEsImp0aSI6Ijk5N2M2ZjA1LWRhNTQtNGNiZC1iYzViLTU5YjM0ZGE4OWE0OSIsInVzZXJuYW1lIjoiMjI1OTk1M2MtYjhhZS00NzMwLWE4MWItZjdjZDViNjFkY2RiIn0.xDTZKzQLZh5l3X3j7KcCZ5ZeJaVGSBXvxtUUmpA5fJCUHEbGHchneJHoU4_w9GmNL2nNKsor6NPLZEUNcZitqpFYol_uQaoiQ7MVvHdVOPggmy-9NaPMMEtmTBVzB8SMxg7d5qSgVGQyywOjOV1uJCg-J19sOC2WIoG-jQYVFxZz_jCk9gDxJqCKb4F7AkwgP65RZrAGGqKezDY2AgQ8wvuq93PZgKc9GRItOun02ffY3MDJNQAfB3X2t6lG_Hl5rl_I54__hQj5QrFduoYdiiKBhh1EMzX2g6vk06rO25hZST4uJ7FK67HoFodcQ7W2rYSNCpnA2OpdR0IW_MMR9g';
    authHeader = {
      Authorization: `Bearer ${accessToken}`,
      // Authorization: `eyJraWQiOiJjXC80eWtTeWVzbHo3UkZXY2E0VDlpa2ZEYTl0Wmo5cmdFWUN5V3ZhdGhJYz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMjU5OTUzYy1iOGFlLTQ3MzAtYTgxYi1mN2NkNWI2MWRjZGIiLCJjb2duaXRvOmdyb3VwcyI6WyJkZWZhdWx0IiwiQWRtaW5zIl0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX1IxY2F1VXBMbSIsImNsaWVudF9pZCI6IjcyYzJ2dG05bnUxOGh2YjFlNXU4YmZqY2RsIiwib3JpZ2luX2p0aSI6Ijk3ZTE0MGFmLWU2NDQtNDc5My05ZmI4LWU0NzE2YmJlMmVlNSIsImV2ZW50X2lkIjoiNjQwZDJmNGMtMWVhNy00YzAwLWI4OTgtNTU5YTU3N2IyNzkyIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY1MzU0NDQ5MSwiZXhwIjoxNjUzNjMwODkxLCJpYXQiOjE2NTM1NDQ0OTEsImp0aSI6Ijk5N2M2ZjA1LWRhNTQtNGNiZC1iYzViLTU5YjM0ZGE4OWE0OSIsInVzZXJuYW1lIjoiMjI1OTk1M2MtYjhhZS00NzMwLWE4MWItZjdjZDViNjFkY2RiIn0.xDTZKzQLZh5l3X3j7KcCZ5ZeJaVGSBXvxtUUmpA5fJCUHEbGHchneJHoU4_w9GmNL2nNKsor6NPLZEUNcZitqpFYol_uQaoiQ7MVvHdVOPggmy-9NaPMMEtmTBVzB8SMxg7d5qSgVGQyywOjOV1uJCg-J19sOC2WIoG-jQYVFxZz_jCk9gDxJqCKb4F7AkwgP65RZrAGGqKezDY2AgQ8wvuq93PZgKc9GRItOun02ffY3MDJNQAfB3X2t6lG_Hl5rl_I54__hQj5QrFduoYdiiKBhh1EMzX2g6vk06rO25hZST4uJ7FK67HoFodcQ7W2rYSNCpnA2OpdR0IW_MMR9g`
    };
  }
  let requestOptions = {
    method: type,
    headers: {
      ...extraHeaders,
      ...authHeader,
    },
  };
  if (body) {
    requestOptions["body"] = body;
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
    month = month.length === 1 ? "0" + month : month;
    let date = dateObj.getDate().toString();
    date = date.length === 1 ? "0" + date : date;
    let year = dateObj.getFullYear().toString();
    return `${year}-${month}-${date}`;
  }
  return "";
}

function validateEmail(email) {
  var re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
  let fileName = "downloaded." + type;
  if (header) {
    var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    var matches = filenameRegex.exec(header);
    if (matches != null && matches[1]) {
      fileName = matches[1].replace(/['"]/g, "");
    }
  }
  return fileName;
}

function timeStampFormat(receivedDate) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const d = new Date(receivedDate);
  let hr = d.getHours();
  let min = d.getMinutes();

  if (min < 10) {
    min = "0" + min;
  }

  let ampm = "AM";

  if (hr > 12) {
    hr -= 12;
    ampm = "PM";
  }

  const date = d.getDate();
  const month = d.getMonth() + 1;
  // const month = months[d.getMonth()];
  const year = d.getFullYear();

  const formatedDate =
    date + " " + month + " " + year + " " + hr + ":" + min + " " + ampm;

  return formatedDate;
}

function timeStampMonthAndYear(received) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const d = new Date(received);
  let hr = d.getHours();
  let min = d.getMinutes();

  if (min < 10) {
    min = "0" + min;
  }

  let ampm = "AM";

  if (hr > 12) {
    hr -= 12;
    ampm = "PM";
  }

  // const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  const formated = month + " " + year;
  return formated;
}

function estimatedMonth(received) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const d = new Date(received);
  let hr = d.getHours();
  let min = d.getMinutes();

  if (min < 10) {
    min = "0" + min;
  }

  let ampm = "AM";

  if (hr > 12) {
    hr -= 12;
    ampm = "PM";
  }

  // const date = d.getDate();
  const month = d.getMonth() + 1;
  // const year = d.getFullYear();

  const formated = month + " months";

  return formated;
}

function dateTimeAndYear(receivedDate) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const d = new Date(receivedDate);
  let hr = d.getHours();
  let min = d.getMinutes();

  if (min < 10) {
    min = "0" + min;
  }

  let ampm = "AM";

  if (hr > 12) {
    hr -= 12;
    ampm = "PM";
  }

  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  const formatedDate = "" + date + " " + month + " " + year + " ";

  return formatedDate;
}
