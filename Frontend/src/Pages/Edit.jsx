import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import NavBar from "../Components/Navbar";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

const Edit = () => {
  const [post, setPost] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [tag, setTag] = useState("");
  const [link, setLink] = useState("");
  const [code, setCode] = useState("");

  let params = useParams();
  const navigate = useNavigate();

  const token = Cookies.get("authToken");

  const EDIT_POST_URL = import.meta.env.VITE_POSTS_URL + "/" + params.id;
  console.log(EDIT_POST_URL);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(EDIT_POST_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPost(res.data);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setCategory(res.data.category);
        setImage(res.data.image || "");
        setTag(res.data.tagName);
        setLink(res.data.link || "");
        setCode(res.data.code || "");
      } catch (err) {
        console.error(err);
      }
    };

    getPost();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        EDIT_POST_URL,
        {
          post: {
            title,
            description,
            category,
            image,
            link,
            code,
          },
          tag: {
            name: tag,
          },
        },
        {
          headers: { "Content-Type": "application/json" },
          Authorization: `Bearer ${token}`,
        }
      );
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
                <label htmlFor="title" className="fw-bold mt-2">
                  Title:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
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
                  onChange={(e) => setTag(e.target.value)}
                  value={tag}
                />
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
                  <option value={category}>{category}</option>
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
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
