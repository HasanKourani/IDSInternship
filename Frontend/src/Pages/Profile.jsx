import React, { useEffect, useState, useContext } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import UserContext, { UserProvider } from "../../Context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookies from "js-cookie";
import NavBar from "../Components/Navbar";

const Profile = () => {
  const { userDetails } = useContext(UserContext);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const token = Cookies.get("authToken");
  const navigate = useNavigate();

  let params = useParams();
  const USER_ID_URL = import.meta.env.VITE_GET_USER_ID_URL + params.id;

  const USER_POST_ID_URL = import.meta.env.VITE_USER_POSTS_URL + params.id;

  useEffect(() => {
    try {
      const getUser = async () => {
        const res = await axios.get(USER_ID_URL);
        setUser(res.data);
        console.log(userDetails);
      };
      getUser();
    } catch (err) {
      console.error(err);
    }
  }, [userDetails]);

  useEffect(() => {
    try {
      const getUserPosts = async () => {
        const res = await axios.get(USER_POST_ID_URL);
        setPosts(res.data);
      };
      getUserPosts();
    } catch (err) {
      console.error(err);
    }
  }, [userDetails]);

  const handleDeleteProfile = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_GET_USER_ID_URL}${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Cookies.remove("authToken");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_POSTS_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      navigate(`/profile/${params.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="d-lg-flex justify-content-center">
        {/* Profile Side Card */}
        <div className="container col-3">
          <div className="d-flex">
            <div>
              <h1 className="mt-5 mb-5">Profile</h1>
              <div className="card">
                <div className="card-body text-center">
                  <h4 className="mb-2">{user.username}</h4>
                  <p className="text-muted mb-4">{user.bio}</p>
                  <p className="text-muted mb-4">Points: {user.points}</p>
                  {userDetails.Id == user.id ? (
                    <span className="d-flex flex-column">
                      <Link
                        className="btn btn-primary btn-rounded btn-lg mb-2"
                        to={`/editProfile/${user.id}`}
                      >
                        Edit Profile
                      </Link>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete your account?"
                            )
                          ) {
                            handleDeleteProfile(userDetails.sub);
                          }
                        }}
                        className="btn btn-danger btn-rounded btn-lg"
                      >
                        Delete Account
                      </button>
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="container col-8 d-flex flex-column align-items-center gap-5">
          <h1 className="mt-5">Posts</h1>
          {posts.map((post) => (
            <Link
              className="card justify-self-start w-75 text-decoration-none"
              key={post.id}
              to={`/posts/${post.id}`}
            >
              <div className="card-body">
                {post.userId == userDetails.sub ? (
                  <div className="d-flex align-items-center justify-content-between">
                    <h4>{post.username}</h4>

                    <span className="d-flex gap-3">
                      <Link
                        className="text-decoration-none"
                        to={`/edit/${post.id}`}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </Link>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this post?"
                            )
                          ) {
                            handleDeletePost(post.id);
                          }
                        }}
                        className="border border-0 bg-transparent text-danger"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </span>
                  </div>
                ) : (
                  <h4>{post.username}</h4>
                )}
                <p className="card-text">
                  <small className="text-body-secondary">
                    {post.datePosted}
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
                <span>
                  Description:
                  <p className="card-text">
                    {post.description.length > 100 ? (
                      <div>
                        {post.description.substring(0, 75)}
                        <Link
                          to={{
                            pathname: `/posts/${post.id}`,
                          }}
                        >
                          See More
                        </Link>
                      </div>
                    ) : (
                      post.description
                    )}
                  </p>
                </span>
                {post.link ? <Link to={post.link}> {post.link}</Link> : <></>}
                {post.code ? (
                  <span className="d-flex flex-column">
                    Code Snippet:
                    <code>
                      <pre className="fs-6">{post.code}</pre>
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
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
