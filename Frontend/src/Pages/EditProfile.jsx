import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import NavBar from "../Components/Navbar";
import UserContext from "../../Context/UserContext";

const EditProfile = () => {
  const [user, setUser] = useState();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const { userDetails } = useContext(UserContext);

  let params = useParams();
  const navigate = useNavigate();

  const token = Cookies.get("authToken");

  const EDIT_PROFILE_URL = import.meta.env.VITE_GET_USER_ID_URL + params.id;
  console.log(EDIT_PROFILE_URL);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(EDIT_PROFILE_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
        setUsername(res.data.username);
        setBio(res.data.bio);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        EDIT_PROFILE_URL,
        {
          username,
          bio,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/profile/${params.id}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {userDetails.sub != params.id ? (
        navigate("/")
      ) : (
        <>
          <NavBar />
          <div className="d-flex justify-content-center align-items-center col-10 mt-3 mb-3">
            <div className="card p-4 border border-0">
              <div className="card-header">
                <h3 className="card-title">Edit Post</h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="username" className="fw-bold mt-2">
                      Username:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      placeholder="Enter username"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="bio" className="fw-bold mt-2">
                      User Bio:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="bio"
                      name="bio"
                      onChange={(e) => setBio(e.target.value)}
                      value={bio}
                      placeholder="Enter bio"
                      required
                    />
                  </div>
                </div>

                <div className="card-footer">
                  <button type="submit" className="btn btn-success">
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EditProfile;
