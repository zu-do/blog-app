import axios from "axios";
import baseUrl from "../config";
import { TOKEN } from "../constants";

const client = axios.create({
  baseURL: `${baseUrl}Articles`,
});

export const getArticles = async () => {
  try {
    const response = await client.get("");

    return response.data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

export const getArticle = async (id) => {
  try {
    const response = await client.get(`/${id}`);
    return response.data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

export const deleteArticle = async (id) => {
  try {
    const token = sessionStorage.getItem(TOKEN);

    if (!token) {
      return null;
    }

    const response = await client.delete(`/${id}`, {
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

export const updateArticle = async (id, body) => {
  try {
    const token = sessionStorage.getItem(TOKEN);

    if (!token) {
      return null;
    }

    const response = await client.patch(`/${id}`, body, {
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

export const createArticle = async (body) => {
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

export const upvoteArticle = async (id) => {
  try {
    const token = sessionStorage.getItem(TOKEN);

    if (!token) {
      return null;
    }

    const response = await client.post(
      `/${id}/upvote`,
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

export const downvoteArticle = async (id) => {
  try {
    const token = sessionStorage.getItem(TOKEN);

    if (!token) {
      return null;
    }

    const response = await client.post(
      `/${id}/downvote`,
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
