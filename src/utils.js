export const truncateText = (title, maxLength) => {
  return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
};
