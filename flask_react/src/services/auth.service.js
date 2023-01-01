import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/";

class AuthService {
  async login(username, password) {
    return axios
      .post(API_URL + "login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.access_token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  async logout() {
    return axios
      .delete(API_URL + "logout", { headers: authHeader() })
      .then((response) => {
        localStorage.removeItem("user");
        return response.data;
      });
  }

  async register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
