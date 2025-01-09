import React from "react";
import NavBar from "../Components/Navbar";
import SideBar from "../Components/SideBar";
import Posts from "../Components/Posts";
import CreatePostCard from "../Components/CreatePostCard";
import ProfileSideBar from "../Components/ProfileSidebar";

function Home() {
  return (
    <>
      <NavBar />
      <div className="d-flex justify-content-between">
        <SideBar />
        <div className="container d-flex flex-column align-items-center gap-5">
          <CreatePostCard />
          <Posts />
          <Posts />
        </div>
        <ProfileSideBar />
      </div>
    </>
  );
}

export default Home;
