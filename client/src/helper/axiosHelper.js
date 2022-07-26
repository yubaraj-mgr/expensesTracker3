import axios from "axios";

const apiEp = "http://localhost:8000";

export const insertUsersToServer = async (data) => {
  try {
    const response = await axios.post(apiEp + "/api/v1", data);
    return response.data;
  } catch (error) {
    error && console.log(error);
  }
};

export const checkUserLoginDetails = async (data) => {
  try {
    const response = await axios.post(apiEp + "/api/v1/login", data);
    return response.data;
  } catch (error) {
    error && console.log(error);
  }
};
