import React from "react";

function Posts() {
  return (
    <div class="card col-lg-10 justify-self-start w-75">
      <div class="card-body">
        <h4>Username</h4>

        <p class="card-text">
          <small class="text-body-secondary">Date Posted</small>
        </p>
        <h5 class="card-title">Post Title</h5>
        <span className="d-flex gap-2">
          <span className="btn btn-danger rounded-pill">Tag</span>
          <span className="btn btn-warning rounded-pill">Category</span>
        </span>
        <p class="card-text">
          Post content. Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Porro provident ex delectus tenetur asperiores debitis molestias
          repudiandae expedita recusandae est!
        </p>
      </div>
      <img
        src="https://code.visualstudio.com/assets/blogs/2017/11/15/vs-code-ls-session.png"
        class="card-img-bottom"
        alt="..."
      />
    </div>
  );
}

export default Posts;
