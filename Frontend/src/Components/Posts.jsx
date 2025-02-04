import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Posts = ({ searchTerm }) => {
  const { userDetails } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const token = Cookies.get("authToken");
  useEffect(() => {
    const getAllPosts = async () => {
      try {
        let url = import.meta.env.VITE_POSTS_URL;

        if (searchTerm) {
          url += "/search";
        }

        const res = await axios.get(url, {
          params: { searchTerm },
        });

        setPosts(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getAllPosts();
  }, [searchTerm]);

  const handleComment = async (e, postId) => {
    e.preventDefault();

    try {
      await axios.post(
        import.meta.env.VITE_COMMENTS + "/Add",
        {
          Context: comment,
          PostId: postId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`posts/${postId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDatePosted = (s) => {
    const date = new Date(s);
    return date
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(",", "");
  };

  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="card col-lg-10 justify-self-start w-75 ">
          <div className="card-body">
            {post.userId == userDetails.sub ? (
              <div className="d-flex align-items-center justify-content-between">
                <h4>
                  <Link
                    className="text-decoration-none text-dark"
                    to={{
                      pathname: `/profile/${post.userId}`,
                    }}
                  >
                    {post.username}
                  </Link>
                </h4>
              </div>
            ) : (
              <h4>
                <Link
                  className="text-decoration-none text-dark"
                  to={{
                    pathname: `/profile/${post.userId}`,
                  }}
                >
                  {post.username}
                </Link>
              </h4>
            )}

            <p className="card-text">
              <small className="text-body-secondary">
                {formatDatePosted(post.datePosted)}
              </small>
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

            <Link
              className="text-decoration-none text-dark"
              key={post.id}
              to={{
                pathname: `posts/${post.id}`,
              }}
            >
              <span className="card-text">
                {post.description.length > 100 ? (
                  <p>{post.description.substring(0, 75)}...</p>
                ) : (
                  post.description
                )}
              </span>
              {post.link ? <Link to={post.link}> {post.link}</Link> : <></>}
              {post.code ? (
                post.code.length > 75 ? (
                  <span className="d-flex flex-column">
                    Code Snippet:
                    <code>
                      <pre className="fs-6">
                        {post.code.substring(0, 50)}...
                      </pre>
                    </code>
                  </span>
                ) : (
                  <span className="d-flex flex-column">
                    Code Snippet:
                    <code>
                      <pre className="fs-6">{post.code}</pre>
                    </code>
                  </span>
                )
              ) : (
                <></>
              )}

              {post.image ? (
                <img
                  src={post.image}
                  className="card-img-bottom"
                  alt="Post Image"
                />
              ) : (
                <></>
              )}
            </Link>
            <Link
              className="form-control text-decoration-none mb-3 text-center"
              to={`posts/${post.id}`}
            >
              See Comments
            </Link>
            <form
              onSubmit={(e) => handleComment(e, post.id)}
              className="d-flex"
            >
              <input
                type="text"
                className="form-control"
                id="comment"
                name="comment"
                autoComplete="off"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                placeholder="Add comment"
                required
              />
              <button type="submit" className="form-control">
                Add Comment
              </button>
            </form>
          </div>
        </div>
      ))}
    </>
  );
};

export default Posts;
