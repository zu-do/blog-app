import axios from "axios";
import baseUrl from "../config";
import { COMMENT_PERM, RANK_PERM, TOKEN, WRITE_PERM } from "../constants";

const client = axios.create({
  baseURL: `${baseUrl}Auth`,
});

export const getUsers = async () => {
  try {
    const token = sessionStorage.getItem(TOKEN);

    if (!token) {
      return null;
    }

    const response = await client.get("Users", {
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

export const registerUser = async (body) => {
  try {
    const response = await client.post(`Register`, { ...body });
    return { success: true, data: response.data };
  } catch (err) {
    console.error(err.message);
    if (err.response && err.response.data) {
      return { success: false, error: err.response.data };
    }

    return { success: false, error: "An unexpected error occurred." };
  }
};

export const loginUser = async (body) => {
  try {
    const response = await client.post(`Login`, { ...body });
    const token = response.data;
    sessionStorage.setItem(TOKEN, token);

    const user = await getUser();
    sessionStorage.setItem(WRITE_PERM, user.canWriteArticles);
    sessionStorage.setItem(RANK_PERM, user.canRankArticles);
    sessionStorage.setItem(COMMENT_PERM, user.canWriteComments);

    return { success: true, data: response.data };
  } catch (error) {
    console.error(error.message);

    if (error.response && error.response.data) {
      return { success: false, error: error.response.data };
    }

    return { success: false, error: "An unexpected error occurred." };
  }
};

export const getUser = async () => {
  try {
    const token = sessionStorage.getItem(TOKEN);
    if (!token) {
      return null;
    }

    const response = await client.get("GetCurrentUser", {
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

export const forgotPasswordRequest = async (email) => {
  try {
    const response = await client.post("ForgotPassword", null, {
      params: { email: email },
    });

    return response.data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

export const restorePassword = async (body) => {
  try {
    const response = await client.post(`RestorePassword`, body);

    return response.data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};
