import React, { useEffect, useState } from "react";
import NavBar from "../Components/Navbar";
import SideBar from "../Components/SideBar";
import Posts from "../Components/Posts";
import CreatePostCard from "../Components/CreatePostCard";
import { useLocation } from "react-router-dom";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search");
    if (query) {
      setSearchTerm(query);
    }
  }, [location.search]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  return (
    <>
      <NavBar handleSearch={handleSearch} />
      <div className="d-flex justify-content-between">
        <SideBar />
        <div className="container d-flex flex-column align-items-center gap-5">
          <CreatePostCard />
          <Posts searchTerm={searchTerm} />
        </div>
      </div>
    </>
  );
}

export default Home;
