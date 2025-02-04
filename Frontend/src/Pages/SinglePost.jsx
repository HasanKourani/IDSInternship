import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "../Components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../Context/UserContext";
import Cookies from "js-cookie";

const SinglePost = () => {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const { userDetails } = useContext(UserContext);

  const navigate = useNavigate();

  const token = Cookies.get("authToken");

  const params = useParams();
  const POST_URL = import.meta.env.VITE_POSTS_URL + "/" + params.id;
  const COMMENTS_URL = import.meta.env.VITE_COMMENTS + "/" + params.id;

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(POST_URL);
        setPost(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getPost();
  }, []);

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(COMMENTS_URL);
        setComments(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getComments();
  }, []);

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
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };

  const DELETE_COMMENTS_URL = import.meta.env.VITE_COMMENTS + "/";
  const handleDeleteComment = async (id) => {
    try {
      await axios.delete(`${DELETE_COMMENTS_URL}${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(0);
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
      <NavBar />
      <div className="d-flex flex-column align-items-center mt-5 gap-5">
        {post ? (
          <div key={post.id} className="card col-lg-10 justify-self-start w-75">
            <div className="card-body">
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
              Description:
              <p className="card-text">{post.description}</p>
              {post.link ? <Link to={post.link}> {post.link}</Link> : <></>}
              {post.code ? (
                <span className="d-flex flex-column">
                  Code Snippet:
                  <code className="w-50 fs-6">
                    <pre>{post.code}</pre>
                  </code>
                </span>
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
            </div>
            <form
              onSubmit={(e) => handleComment(e, post.id)}
              className="d-md-flex justify-content-center mb-2"
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
        ) : (
          <span>Post doesn't exist</span>
        )}

        <div className="container w-75">
          <h3 className="card justify-self-start w-75 border border-0">
            Comments
          </h3>
          {comments.map((comment) => (
            <div className="card mb-2" key={comment.id}>
              <div className="card-body">
                <div className="col-md-10">
                  <p className="d-flex justify-content-between">
                    <Link
                      className="text-decoration-none text-dark"
                      to={{
                        pathname: `/profile/${comment.userId}`,
                      }}
                    >
                      <strong>{comment.username}</strong>
                    </Link>
                    {userDetails.sub == comment.userId ? (
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete your comment?"
                            )
                          ) {
                            handleDeleteComment(comment.id);
                          }
                        }}
                        className="border border-0 bg-transparent text-danger"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    ) : (
                      <></>
                    )}
                  </p>
                  <p>{comment.context}</p>
                  <p className="text-secondary">
                    {formatDatePosted(comment.dateCommented)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SinglePost;
