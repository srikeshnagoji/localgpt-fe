import axios from "axios";

// const BASE_URL = "http://localhost:5110/api";
const BASE_URL = "http://localhost:3130/api";
const apiService = axios.create({
  baseURL: BASE_URL,
});

export const fetchResponse = (userPrompt, responseHandler) => {
  let bodyFormData = new FormData();
  bodyFormData.append("user_prompt", userPrompt);
  apiService
    .post("/prompt_route", bodyFormData)
    .then((response) => {
      responseHandler(response);
    })
    .catch((error) => {
      console.error("API Error:", error);
      throw error;
    });
};
