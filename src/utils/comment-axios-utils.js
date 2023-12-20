import axios from "axios";
import baseUrl from "../config";
import { TOKEN } from "../constants";

const client = axios.create({
  baseURL: `${baseUrl}Articles`,
});

export const getComments = async (id) => {
  try {
    const response = await client.get(`/${id}/Comments`);
    return response.data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

export const createComment = async (articleId, body) => {
  try {
    const token = sessionStorage.getItem(TOKEN);

    if (!token) {
      return null;
    }

    const response = await client.post(`/${articleId}/Comments`, body, {
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

export const deleteComment = async (articleId, commentId) => {
  try {
    const token = sessionStorage.getItem(TOKEN);

    if (!token) {
      return null;
    }

    const response = await client.delete(
      `/${articleId}/Comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

export const editComment = async (articleId, commentId, body) => {
  try {
    const token = sessionStorage.getItem(TOKEN);

    if (!token) {
      return null;
    }

    const response = await client.patch(
      `/${articleId}/Comments/${commentId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

export const blockComment = async (articleId, commentId, body) => {
  try {
    const token = sessionStorage.getItem(TOKEN);

    if (!token) {
      return null;
    }
    const response = await client.post(
      `/${articleId}/Comments/${commentId}/block`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

export const reportComment = async (articleId, commentId) => {
  try {
    const token = sessionStorage.getItem(TOKEN);

    if (!token) {
      return null;
    }
    const response = await client.post(
      `/${articleId}/Comments/${commentId}/report`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};
