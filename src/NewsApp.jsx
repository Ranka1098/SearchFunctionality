import React from "react";
import HeaderBottom from "./component/HeaderBottom";
import NewsCard from "./component/NewsCard";
import Header from "./component/Header";

const NewsApp = () => {
  return (
    <div>
      <Header />
      <HeaderBottom />
      <NewsCard />
    </div>
  );
};

export default NewsApp;
