import apiRequest from "./index.js";  // Explicitly specify the file name

export const GetQuickSearchFilterResults = async (payload) => {
  return await apiRequest({
    method: "GET",
    endPoint: "/api/filters",
    queryStrings: payload,
  });
};
