import axios from "axios";
import Cookies from "js-cookie";

let API_URL = "http://localhost:8080";

function callApi(endpoint, method = "GET", body) {
  return axios({
    method,
    url: `${API_URL}/${endpoint}`,
    data: body,
  }).catch((e) => {
    console.log(e);
    throw e;
  });
}

function callApiAuth(endpoint, method = "GET", body) {
  const token = Cookies.get('tokenUser');
  // console.log('Token:', token); // Debugging line
  return axios({
    method,
    url: `${API_URL}/${endpoint}`,
    data: body,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).catch((e) => {
    console.log(e);
    throw e;
  });
}


export function GET_ALL(endpoint) {
  return callApi(endpoint, "GET");
}

export function GET_ID(endpoint, id) {
  return callApi(endpoint + "/" + id, "GET");
}
export function POST_ADD_REGISTER(endpoint, data) {
  return callApi(endpoint, "POST", data);
}

export function POST_ADD(endpoint, data) {
  return callApiAuth(endpoint, "POST", data);
}

export function PUT_EDIT(endpoint, data) {
  return callApiAuth(endpoint, "PUT", data);
}

export function DELETE_ID(endpoint,data) {
  return callApiAuth(endpoint , "DELETE",data);
}

export function GET_IMG(endpoint, imgName) {
  return API_URL + "/" + endpoint + "/images/" + imgName;
}

export function LOGIN(endpoint, data) {
  return callApi(endpoint, "POST", data)
    .then(response => {
      const token = response.data.token;
      Cookies.set('tokenUser', token, { expires: 365 });
      return response;
    });
}

export function LOGOUT() {
  Cookies.remove('tokenUser');
}

export function GET_USER_INFO(endpoint) {
  return callApiAuth(endpoint, "GET");
}
export function POST_ADD_ORDER(endpoint, data) {
  return callApiAuth(endpoint, "POST", data);
}
//thanh toan
export function CHECKOUT(endpoint) {
  return callApiAuth(endpoint, "GET");
}
//get giỏ hàng người dùng dựa theo token
export function GET_CART_TOKEN(endpoint) {
  return callApiAuth(endpoint, "GET");
}
// get by token
export function GET_INFO_BY_TOKEN(endpoint) {
  return callApiAuth(endpoint, "GET");
}

