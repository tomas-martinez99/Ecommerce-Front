// src/services/productImages.service.js
import axios from "axios";

const API_URL = "http://localhost:5053/api/product";

export const uploadProductImage = async (productId, file, isMain = false) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(
    `${API_URL}/${productId}/images?isMain=${isMain}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res.data;
};

export const deleteProductImage = async (productId, imageId) => {
  const res = await axios.delete(`${API_URL}/${productId}/images/${imageId}`);
  return res.data;
};

export const setMainProductImage = async (productId, imageId) => {
  const res = await axios.put(
    `${API_URL}/${productId}/images/${imageId}/set-main`
  );
  return res.data;
};
