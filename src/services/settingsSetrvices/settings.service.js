import { api } from "../../api/api.js";

const BASE = "/Settings";


export const getSettings = async () => {
  const { data } = await api.get(BASE);
  return data;
};

export const updateSettings = async (settings) => {
  const { data } = await api.put(BASE, settings);
  return data;
};