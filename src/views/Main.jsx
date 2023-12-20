import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import { WRITE_PERM } from "../constants";
import { getArticles } from "../utils/article-axios-utils";
import {
  getLastCommentedArticles,
  getTop3Articles,
} from "../utils/article-utils";

const Main = () => {
  const { state } = useLocation();
  const [articles, setArticles] = useState(
    state !== null ? state.updArticles : []
  );

  const [filteredArticles, setFilteredArticles] = useState(null);

  useEffect(() => {
    getArticles()
      .then(async (data) => {
        setArticles(data);
        setFilteredArticles(null);
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  const navigateToAddArticle = () => {
    navigate("/addArticle");
  };

  const handleSearch = (event) => {
    const searchWord = event.target.value;
    if (searchWord.length === 0) {
      setFilteredArticles(null);
    } else {
      const newFilter = articles.filter((value) => {
        return value.title.toLowerCase().includes(searchWord.toLowerCase());
      });
      setFilteredArticles(newFilter);
    }
  };

  const top3Articles = getTop3Articles(articles);

  const lastCommentedArticles = getLastCommentedArticles(articles);

  return (
    <div className="main-wrap w-100">
      <h1 className="d-flex justify-content-between align-items-center m-4">
        {sessionStorage.getItem(WRITE_PERM) === "true" && (
          <Button variant="outline-primary" onClick={navigateToAddArticle}>
            Add new article
          </Button>
        )}
      </h1>

      <input
        className="form-control form-control-sm ms-auto w-50 me-4 rounded"
        type="search"
        placeholder="Search for the article"
        aria-label="Search"
        style={{ borderColor: "#3498db" }}
        onChange={handleSearch}
      />

      {!filteredArticles && (
        <>
          <div className="container">
            <h2>Latest Articles</h2>
            <div className="row">
              {articles
                ?.slice(-5)
                .reverse()
                .map((p) => (
                  <div
                    key={p.id}
                    className="col-lg-4 col-sm-12 col-xs-12 px-3 py-3"
                  >
                    <ArticleCard key={p.id} article={p}></ArticleCard>
                  </div>
                ))}
            </div>
          </div>
          <div className="container">
            <h2>Top Rated Articles</h2>
            <div className="row">
              {top3Articles?.map((p) => (
                <div
                  key={p.id}
                  className="col-lg-4 col-sm-12 col-xs-12 px-3 py-3"
                >
                  <ArticleCard key={p.id} article={p}></ArticleCard>
                </div>
              ))}
            </div>
          </div>
          <div className="container">
            <h2>Last Commented Articles</h2>
            <div className="row">
              {lastCommentedArticles?.map((p) => (
                <div
                  key={p.id}
                  className="col-lg-4 col-sm-12 col-xs-12 px-3 py-3"
                >
                  <ArticleCard key={p.id} article={p}></ArticleCard>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {filteredArticles && (
        <>
          <div className="container">
            <div className="row">
              {filteredArticles.map((p) => (
                <div
                  key={p.id}
                  className="col-lg-4 col-sm-12 col-xs-12 px-3 py-3"
                >
                  <ArticleCard key={p.id} article={p}></ArticleCard>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
