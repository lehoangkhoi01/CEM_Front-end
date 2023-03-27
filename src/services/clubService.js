import ApiCaller from "../helpers/ApiCaller";

//GET
const getClubs = async () => {
  let result = await ApiCaller.get(`api/ClubProfile`);
  return result;
};

const getClubDetail = async (id) => {
  let result = await ApiCaller.get(`api/ClubProfile/${id}`);
  return result;
}


//POST
const createNewClub = async (data) => {
  let result = await ApiCaller.post(`api/ClubProfile`, data);
  return result;
}

export { getClubs, getClubDetail, createNewClub };
