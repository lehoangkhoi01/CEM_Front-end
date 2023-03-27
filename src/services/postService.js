import ApiCaller from "../helpers/ApiCaller";
//GET
const getPosts = async (page = 1, pageSize) => {
  let result = await ApiCaller.get(
    `Odata/EventPost?$skip=${
      (page - 1) * pageSize
    }&$top=${pageSize}&expand=clubProfile`
  );
  return result;
};

const getPostsByEventId = async (id) => {
  let result = await ApiCaller.get(
    `Odata/EventPost?$filter=eventId eq ${id}&expand=clubProfile`
  );
  return result;
};

//POST

const createPost = async (data) => {
  let result = await ApiCaller.post(`Odata/EventPost`, data);
  return result;
};
export { getPosts, getPostsByEventId, createPost };
