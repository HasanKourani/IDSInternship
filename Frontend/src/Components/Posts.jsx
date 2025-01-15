import React, { useEffect, useState } from "react";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState([]);

  // const token = localStorage.getItem("jwtToken");
  // let username = "";

  // if (token) {
  //   try {
  //     const decodedtoken = jwtDecode(token);
  //     username = decodedtoken.username;
  //   } catch (error) {
  //     console.error("Invalid token");
  //   }
  // }

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const res = await axios.get("https://localhost:7217/api/posts");
        console.log("Fetched data: ", res.data);
        setPosts(res.data);
      } catch (error) {
        setError("Error fetching posts");
      }
    };

    getAllPosts();
  }, []);

  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="card col-lg-10 justify-self-start w-75">
          <div className="card-body">
            <h4>{post.username}</h4>

            <p className="card-text">
              <small className="text-body-secondary">{post.datePosted}</small>
            </p>
            <h5 className="card-title">{post.title}</h5>
            <span className="d-flex gap-2">
              <span className="btn btn-danger rounded-pill">
                {post.tagName}
              </span>
              <span className="btn btn-warning rounded-pill">
                {post.category}
              </span>
            </span>
            <p className="card-text">{post.description}</p>
          </div>

          <img
            src="https://code.visualstudio.com/assets/blogs/2017/11/15/vs-code-ls-session.png"
            className="card-img-bottom"
            alt="..."
          />
        </div>
      ))}
    </>
  );
};

// function Posts() {
//   return (

//   );
// }

export default Posts;
