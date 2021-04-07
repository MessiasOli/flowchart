import axios from "axios";
import { RequestError } from "../utils/global"

const success = res => res;

const error = err => {
  if (err.message == 'Network Error') {
    console.log("Network Error"); 
    RequestError("Problema de comunicação.");
  } else if (500 != err.response.status) {
    RequestError(err.response.data);
  } else if (409 == err.response.status) {
    RequestError(err.response.data);
  } else if (400 == err.response.status) {
    RequestError(err.response.data);
  } else if (401 == err.response.status) {
    RequestError(err.response.data);
  } else {
    return Promise.reject(err);
  }
};

axios.interceptors.response.use(success, error);