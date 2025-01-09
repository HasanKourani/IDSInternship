import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function CreatePostCard() {
  return (
    <div className="card mt-5 w-75">
      <div className="card-body">
        <h5 className="card-title">What Problem Are you facing?</h5>
        <p className="card-text">Create a new post!</p>
        <Link to="/create" className="btn btn-primary">
          <FontAwesomeIcon icon={faPlus} size="lg" className="me-2" />
          Create
        </Link>
      </div>
    </div>
  );
}

export default CreatePostCard;
