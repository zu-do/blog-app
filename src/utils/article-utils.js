export const getTop3Articles = (articles) => {
  const sortedArticles = articles.sort((a, b) => b.rank - a.rank);
  return sortedArticles.slice(0, 3);
};

export const getLastCommentedArticles = (articles) => {
  const sortedArticles = articles.sort(
    (a, b) => new Date(b.lastCommentedAt) - new Date(a.lastCommentedAt)
  );
  return sortedArticles.slice(0, 3);
};
