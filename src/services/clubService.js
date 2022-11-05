import ApiCaller from "../helpers/ApiCaller";

//GET
const getClubs = async () => {
  let result = await ApiCaller.get(`api/ClubProfile`);
  return result;
};

export { getClubs };
