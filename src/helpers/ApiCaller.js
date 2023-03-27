import axios from "axios";

const BASE_BACKEND_URL = "https://localhost:49155";

const baseGet = async (path, params) => {
  let token = localStorage.getItem("token");
  let tokenHeader = token ? { Authorization: `Bearer ${token}` } : {};
  let result = await axios({
    method: "get",
    url: `${BASE_BACKEND_URL}/${path}`,
    params,
    headers: {
      ...tokenHeader,
    },
  });
  return result;
};

const baseRemove = async (path, params) => {
  let token = localStorage.getItem("token");
  let tokenHeader = token ? { Authorization: `Bearer ${token}` } : {};
  let result = await axios({
    method: "delete",
    url: `${BASE_BACKEND_URL}/${path}`,
    params,
    headers: {
      ...tokenHeader,
    },
  });
  return result;
};

const basePost = async (path, data) => {
  let token = localStorage.getItem("token");
  let tokenHeader = token ? { Authorization: `Bearer ${token}` } : {};
  let result = await axios({
    method: "post",
    url: `${BASE_BACKEND_URL}/${path}`,
    data: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      ...tokenHeader,
    },
  });
  return result;
};

const basePut = async (path, data) => {
  let token = localStorage.getItem("token");
  let tokenHeader = token ? { Authorization: `Bearer ${token}` } : {};
  let result = await axios({
    method: "put",
    url: `${BASE_BACKEND_URL}/${path}`,
    data: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      ...tokenHeader,
    },
  });
  return result;
};

const apiWrapper = (asyncFunc) => {
  return async (path, secondPara) => {
    let result;
    try {
      result = await asyncFunc(path, secondPara);
      result.ok = true;
      return result;
    } catch (ex) {
      if (!ex.response) {
        console.log("Can not connect to the server");
        ex.ok = false;
        return ex;
      }
      ex.response.ok = false;
      if (ex.response.status >= 500) {
        console.log("Internal server error");
      }
      if (ex.response.status === 401) {
        console.log("Need login");
      }
      if (ex.response.status === 404) {
        console.log("No data");
      }
      console.log(asyncFunc.name, ex);
      return ex.response;
    }
  };
};

const get = apiWrapper(baseGet);
const post = apiWrapper(basePost);
const put = apiWrapper(basePut);
const remove = apiWrapper(baseRemove);

export default { get, post, put, remove };
