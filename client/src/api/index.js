import axios from "axios";

const apiRequest = async ({ method, endPoint, payload, queryStrings }) => {
  try {
    const response = await axios({
      method,
      url: endPoint,
      data: payload,
      params: queryStrings,
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // Log the response for debugging
    console.log("API response:", response);

    // Check if response contains data
    if (!response || !response.data) {
      throw new Error("No data found in response");
    }
    return response.data;
  } catch (error) {
    console.error("API request error:", error); // Log error
    throw new Error(
      error.response.data.message || error.message || "Something went wrong"
    );
  }
};

export default apiRequest;
