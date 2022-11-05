import ApiCaller from "../helpers/ApiCaller";
//GET
const getPageCount = async (pageSize) => {
  let result = await ApiCaller.get(`api/Events/PageCount?pageSize=${pageSize}`);
  return result;
};

const getEvents = async (page, pageSize) => {
  let result = await ApiCaller.get(
    `api/Events?pageIndex=${page}&pageSize=${pageSize}`
  );
  return result;
};

export { getPageCount, getEvents };
