import instance from ".";
import { deleteToken, storeToken } from "./storage/token";

const register = async (userData) => {
  const { data } = await instance.post("/register", userData);
  const token = data.token;
  if (token) {
    storeToken(token);
  }
};

const login = async (userData) => {
  const { data } = await instance.post("/login", userData);
  const token = data.token;
  if (token) {
    storeToken(token);
  }
};

const logout = () => {
  deleteToken();
};
export { register, login, logout };
