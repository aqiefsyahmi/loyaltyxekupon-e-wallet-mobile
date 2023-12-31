import { api } from "../../services/axiosInstance";
import { storeObject, getObject } from "../../helpers/asyncStorage";

// login
export const login = async (id, password) => {
  const token = await api.post("/auth/login", {
    id: id,
    password: password,
  });

  // Store token in async storage
  await storeObject("token", token.data);
  // return role
  return token.data.role;
};

// Renew token
export const renewToken = async () => {
  const token = await getObject("token");
  const newToken = await api.post("/auth/token", {
    refreshToken: token.refreshToken,
  });

  return newToken;
};

// Logout
export const logout = async () => {
  const token = await getObject("token");
  return await api.post("/auth/logout", {
    refreshToken: token.refreshToken,
  });
};
