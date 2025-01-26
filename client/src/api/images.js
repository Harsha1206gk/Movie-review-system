import apiRequest from "./index.js";  // Explicitly specify the file name

export const UploadImage = async (payload) => {
  return await apiRequest({
    method: "POST",
    endPoint: "/api/images/upload-image",
    payload,
  });
};
