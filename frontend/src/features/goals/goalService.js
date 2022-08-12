import axios from "axios";

const API_URL = "/api/goals";

const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorizaton: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, goalData, config);

  if (response.data) {
    localStorage.setItem("goals", JSON.stringfy(response.data));
  }
  return response.data;
};

//get goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorizaton: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  if (response.data) {
    localStorage.setItem("goals", JSON.stringfy(response.data));
  }
  return response.data;
};

const goalService = {
  createGoal,
  getGoals,
};
export default goalService;
