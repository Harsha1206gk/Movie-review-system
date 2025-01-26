import apiRequest from "./index.js"; // Explicitly specify the file name

export const AddTheater = async (data) => {
    try {
      const response = await apiRequest({
        method: "POST",
        endPoint: "/api/theaters",  // Ensure the endpoint is correct
        payload: data,  // Send the theater data in the request body
      });
      return response;  // Return the response from the API
    } catch (error) {
      // Handle any errors
      console.error("Error adding theater:", error);
      throw error;  // Rethrow the error to be handled by the calling function
    }
  };

export const GetAllTheaters = async (payload) => {
  return await apiRequest({
    method: "GET",
    endPoint: "/api/theaters",
    queryStrings: payload,
  });
};

export const GetTheaterById = async (id) => {
  return await apiRequest({
    method: "GET",
    endPoint: `/api/theaters/${id}`,
  });
};

export const UpdateTheater = async (id, data) => {
  return await apiRequest({
    method: "PUT",
    endPoint: `/api/theaters/${id}`,
    payload: data,
  });
};

export const DeleteTheater = async (id) => {
  return await apiRequest({
    method: "DELETE",
    endPoint: `/api/theaters/${id}`,
  });
};
