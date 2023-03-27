import ApiCaller from "../helpers/ApiCaller";
//GET
const getStudentAccount = async (email) => {
  let result = await ApiCaller.get(`api/Student?email=${email}`);
  return result;
};

const getStudentClubProfile = async (studentId) => {
  let result = await ApiCaller.get(`api/Student/StudentClubProfile?studentAccountId=${studentId}`)
  return result;
}


export {
    getStudentAccount,
    getStudentClubProfile
}