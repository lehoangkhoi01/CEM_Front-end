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

const getEventDetail = async (id, activitySize = 5) => {
  let result = await ApiCaller.get(
    `api/Events/${id}?activitySize=${activitySize}`
  );
  return result;
};

//POST
const searchEvents = async (data) => {
  let result = await ApiCaller.post("api/Events/search", data);
  return result;
};

const searchOnDraft = async (data) => {
  let result = await ApiCaller.post("api/Events/searchOnDraft", data);
  return result;
};

const createEvent = async (data) => {
  let result = await ApiCaller.post("api/Events", data);
  return result;
};

const addEventActivity = async (data) => {
  let result = await ApiCaller.post("Odata/EventActivity", data);
  return result;
};

const updateEvent = async (id, data) => {
  let result = await ApiCaller.put(`api/Events/${id}`, data);
  return result;
};

export {
  getPageCount,
  getEvents,
  getEventDetail,
  searchEvents,
  createEvent,
  addEventActivity,
  searchOnDraft,
  updateEvent,
};
