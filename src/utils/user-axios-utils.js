import axios from "axios";
import baseUrl from "../config";
import { TOKEN } from "../constants";

const client = axios.create({
  baseURL: `${baseUrl}Profile`,
});

export const changePassword = async (body) => {
  try {
    const token = sessionStorage.getItem(TOKEN);

    if (!token) {
      return null;
    }

    const response = await client.post(`ResetPassword`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

export const updateProfileInfo = async (body) => {
  try {
    const token = sessionStorage.getItem(TOKEN);

    if (!token) {
      return null;
    }

    const response = await client.post(`ChangeProfile`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};
