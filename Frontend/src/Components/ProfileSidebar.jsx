import React from "react";

function ProfileSideBar() {
  return (
    <div className="card col-lg-2 me-5 mt-5 p-2 d-xs-none d-lg-block">
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
        className="card-img-top rounded-pill"
        alt="profile picture"
      />
      <div className="card-body d-flex flex-column gap-3">
        <h5 className="card-title">Username</h5>
        <p className="card-text">User details (description)</p>
        <p className="card-text">Points</p>
        <a href="#" className="btn btn-primary align-self-start">
          View Profile
        </a>
        <a href="#" className="btn btn-outline-primary align-self-start">
          Edit Profile
        </a>
      </div>
    </div>
  );
}

export default ProfileSideBar;
