import React, { useContext, useEffect, useRef, useState } from "react";
import NavBar from "../Components/Navbar";
import SideBar from "../Components/SideBar";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import Cookies from "js-cookie";

const CreatePost = () => {
  const { userDetails } = useContext(UserContext);
  const titleRef = useRef();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [link, setLink] = useState("");
  const [code, setCode] = useState("");
  const [availableTags, setAvailableTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);

  const token = Cookies.get("authToken");

  if (token == null) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_TAGS);
        setAvailableTags(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTags();
  }, []);

  const handleTagChange = (e) => {
    const inputTag = e.target.value;
    setTag(inputTag);

    if (inputTag.length >= 2) {
      const filtered = availableTags.filter((availableTag) =>
        availableTag.name.toLowerCase().includes(inputTag.toLowerCase())
      );
      setFilteredTags(filtered);
    } else {
      setFilteredTags([]);
    }
  };

  const handleTagSelect = (selectedTag) => {
    setTag(selectedTag.name);
    setFilteredTags([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        import.meta.env.VITE_POSTS_URL,
        {
          post: {
            title,
            description,
            category,
            link,
            code,
          },
          tag: {
            name: tag,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/");
    } catch (err) {
      if (err.res) {
        console.error(err.res.data);
      } else if (err.request) {
        console.log(err);
      } else {
        console.log(err);
      }
    }
  };
  return (
    <>
      <NavBar />
      <section className="d-flex">
        <SideBar />
        <div className="d-flex justify-content-center align-items-center col-10 mt-3 mb-3">
          <div className="card p-4 border border-0">
            <div className="card-header">
              <h3 className="card-title">Create Post</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="title" className="fw-bold mt-2">
                    Title:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    ref={titleRef}
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder="Enter title"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="content" className="fw-bold mt-2">
                    Description:
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    cols="70"
                    rows="4"
                    className="form-control"
                    placeholder="Write Something..."
                    style={{ resize: "none" }}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="code" className="fw-bold mt-2">
                    Code Snippet:
                  </label>
                  <textarea
                    className="form-control"
                    id="code"
                    name="code"
                    cols="70"
                    rows="4"
                    placeholder="Enter code"
                    style={{ resize: "none", whiteSpace: "pre" }}
                    autoComplete="off"
                    onChange={(e) => setCode(e.target.value)}
                    value={code}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="tag" className="fw-bold mt-2">
                    Tag:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    placeholder="Enter tag"
                    autoComplete="off"
                    required
                    onChange={handleTagChange}
                    value={tag}
                  />
                  {filteredTags.length > 0 && (
                    <ul
                      className="list-group mt-2"
                      style={{ maxHeight: "200px", overflowY: "auto" }}
                    >
                      {filteredTags.map((filteredTag) => (
                        <li
                          key={filteredTag.id}
                          className="list-group-item"
                          onClick={() => handleTagSelect(filteredTag)}
                          style={{ cursor: "pointer" }}
                        >
                          {filteredTag.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="category" className="fw-bold mt-2">
                    Category:
                  </label>
                  <select
                    name="category"
                    id="category"
                    className="form-control"
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Bug Fix">Bug Fix</option>
                    <option value="Question">Question</option>
                    <option value="Tips & Tricks">Tips & Tricks</option>
                    <option value="Code Review">Code Review</option>
                    <option value="Tutorial">Tutorial</option>
                    <option value="Resource">Resource</option>
                    <option value="Showcase">Showcase</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="link" className="fw-bold mt-2">
                    Link:
                  </label>
                  <input
                    type="link"
                    className="form-control"
                    id="link"
                    name="link"
                    placeholder="Insert link (https://www.exampleUrl.com)"
                    onChange={(e) => setLink(e.target.value)}
                    value={link}
                    autoComplete="off"
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
      </section>
    </>
  );
};

export default CreatePost;
