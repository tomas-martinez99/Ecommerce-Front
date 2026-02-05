// userService.js
import { api } from "../../api/api";

const BASE = "/users";

const getAll = async () => {
  const { data } = await api.get(BASE);
  return data;
};

export default { getAll };