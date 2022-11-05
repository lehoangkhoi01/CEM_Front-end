import ApiCaller from "./ApiCaller";

export const login = async (email, fullname) => {
  const data = { email, fullname };
  const result = await ApiCaller.post("api/Authorization", data);
  return result;
};

export const checkFptMail = (email) => {
  let fptDomain = email.split("@")[1];
  if (fptDomain === "fpt.edu.vn") {
    return true;
  } else return false;
};
