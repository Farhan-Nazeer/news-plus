import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "./Header";
import NewsCard from "./NewsCard";
import Footer from "./Footer";
import BookmarkedHeader from "./BookmarkedHeader";
import Separator from "./Separator";
import CategoriesBar from "./CategoriesBar";
import NoResults from "./NoResults";
import LoadMoreButton from "./LoadMoreButton";
import BackToTopButton from "./BackToTopButton";

const api_key = process.env.REACT_APP_API_KEY;

const App = () => {
  const [requestParams, setRequestParams] = useState({
    country: "ca",
    category: "",
    keywords: "",
    pageSize: 20,
  });
  const [newsArticles, setNewsArticles] = useState([]);
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
  const [searchBar, setSearchBar] = useState("");
  const [resultsMessage, setResultsMessage] = useState(
    "No results match your search"
  );
  const [buttonClasses, setButtonClasses] = useState(["category-bar-text-clicked", ...Array(6).fill("category-bar-text")]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?q=news&apiKey=${api_key}`
        );
        setNewsArticles(response.data.articles);
      } catch (error) {
        if (error.response.status === 429) {
          setResultsMessage(
            "API max request limit reached, please try again tomorrow."
          );
        } else {
          setResultsMessage(error.response.data.message);
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { country, category, keywords, pageSize } = requestParams;
      const countryParam = country ? `&country=${country}` : "";
      const categoryParam = category ? `&category=${category}` : "";
      const keywordsParam = keywords ? `&q=${keywords}` : "";
      const pageSizeParam = pageSize ? `&pageSize=${pageSize}` : "";

      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?apiKey=${api_key}${countryParam}${categoryParam}${keywordsParam}${pageSizeParam}`
        );
        setNewsArticles(response.data.articles);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [requestParams]);

  const removeArticle = (id) => {
    setNewsArticles((prevArticles) => {
      return prevArticles.filter((article, index) => index !== id);
    });
  };

  const removeBookmarkedArticle = (id) => {
    setBookmarkedArticles((prevBookmarkedArticles) => {
      return prevBookmarkedArticles.filter((article, index) => index !== id);
    });
  };

  return (
    <div>
      <Header
        requestParams={requestParams}
        onSetRequestParams={setRequestParams}
        searchBar={searchBar}
        onSetSearchBar={setSearchBar}
      />
      <CategoriesBar
        onSetRequestParams={setRequestParams}
        onSetSearchBar={setSearchBar}
        buttonClasses={buttonClasses}
        onSetButtonClasses={setButtonClasses}
      />
      <div className="content-container">
        {bookmarkedArticles.length > 0 && <BookmarkedHeader />}
        {bookmarkedArticles.map((article, index) => (
          <NewsCard
            key={index}
            id={index}
            article={article}
            onSetBookmarkedArticles={setBookmarkedArticles}
            bookmarkedArticles={bookmarkedArticles}
            onRemoveBookmarkedArticle={removeBookmarkedArticle}
            isBookmarked={1}
            newsArticles={newsArticles}
            onSetNewsArticles={setNewsArticles}
          />
        ))}
        {bookmarkedArticles.length > 0 && <Separator />}
        {newsArticles.length === 0 && (
          <NoResults resultsMessage={resultsMessage} />
        )}
        {newsArticles.map((article, index) => (
          <NewsCard
            key={index}
            id={index}
            article={article}
            onSetBookmarkedArticles={setBookmarkedArticles}
            bookmarkedArticles={bookmarkedArticles}
            onRemoveArticle={removeArticle}
            isBookmarked={0}
          />
        ))}
        <LoadMoreButton
          requestParams={requestParams}
          onSetRequestParams={setRequestParams}
          resultsLength={newsArticles.length}
          bookmarkedLength={bookmarkedArticles.length}
        />
      </div>
      {newsArticles.length > 15 && <BackToTopButton />}
      <Footer />
    </div>
  );
};

export default App;
