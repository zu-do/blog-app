import axios from "axios";
import baseUrl from "../config";
import { TOKEN } from "../constants";

const client = axios.create({
  baseURL: `${baseUrl}Admin`,
});

export const changeWritePermission = async (body) => {
  try {
    const token = sessionStorage.getItem(TOKEN);

    if (!token) {
      return null;
    }

    const response = await client.post("", body, {
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

export const changeRankPermission = async (body) => {
  try {
    const token = sessionStorage.getItem(TOKEN);

    if (!token) {
      return null;
    }

    const response = await client.post("Rank", body, {
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

export const changeCommentPermission = async (body) => {
  try {
    const token = sessionStorage.getItem(TOKEN);

    if (!token) {
      return null;
    }

    const response = await client.post("Comment", body, {
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

export const getReportedComments = async () => {
  try {
    const token = sessionStorage.getItem(TOKEN);

    if (!token) {
      return null;
    }

    const response = await client.get("Reports", {
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
