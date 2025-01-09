import React from "react";
import NavBar from "../Components/Navbar";
import SideBar from "../Components/SideBar";

function CreatePost() {
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
            <form>
              <div className="card-body">
                <div className="form-group">
                  <label for="title" className="fw-bold mt-2">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="Enter title"
                  />
                </div>
                <div className="form-group">
                  <label for="content" className="fw-bold mt-2">
                    Content
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    cols="70"
                    rows="4"
                    className="form-control"
                    placeholder="Write Something..."
                    style={{ resize: "none" }}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label for="tag" className="fw-bold mt-2">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    placeholder="Enter tag"
                  />
                </div>
                <div className="form-group">
                  <label for="category" className="fw-bold mt-2">
                    Category
                  </label>
                  <select
                    name="category"
                    id="category"
                    className="form-control"
                  >
                    <option value="web">Web app</option>
                    <option value="mobile">Mobile app</option>
                    <option value="desktop">Desktop app</option>
                  </select>
                </div>
                <div className="form-group">
                  <label for="image" className="fw-bold mt-2">
                    Upload Image
                  </label>
                  <div className="input-group">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input form-control"
                        id="image"
                        accept="image/png, image/gif, image/jpeg"
                      />
                    </div>
                  </div>
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
}

export default CreatePost;
