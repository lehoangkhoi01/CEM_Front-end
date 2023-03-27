import ApiCaller from "../helpers/ApiCaller";

//GET
const getStudentClubProfile = async(id) => {
    let result = ApiCaller.get(`api/Student?studentAccountId=${id}`);
    return result;
}

export {
    getStudentClubProfile
}