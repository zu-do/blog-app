import {
  ADMIN,
  COMMENT_PERM,
  CURRENT_USER_ID,
  RANK_PERM,
  ROLE,
  TOKEN,
  WRITE_PERM,
} from "../constants";

export const checkToken = () => {
  const token = sessionStorage.getItem(TOKEN);
  return Boolean(token);
};

export const removePermissions = () => {
  sessionStorage.removeItem(WRITE_PERM);
  sessionStorage.removeItem(COMMENT_PERM);
  sessionStorage.removeItem(RANK_PERM);
  sessionStorage.removeItem(CURRENT_USER_ID);
};

export const hasCommentPerm = () => {
  const canComment = sessionStorage.getItem(COMMENT_PERM);
  return canComment === "true";
};

export const checkEditDeletePerm = (id) => {
  const writePermission = sessionStorage.getItem(WRITE_PERM) === "true";
  const idMatch = sessionStorage.getItem(CURRENT_USER_ID) === id;
  const isAdmin = sessionStorage.getItem(ROLE) === ADMIN;
  const result = (writePermission && idMatch) || isAdmin;
  console.log(result);
  return result;
};
