import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faPlus,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav
      className="navbar navbar-expand-lg bg-none navbar-light border-bottom border-dark"
      aria-label="Thirteenth navbar example"
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample11"
          aria-controls="navbarsExample11"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse d-lg-flex"
          id="navbarsExample11"
        >
          <a className="navbar-brand col-lg-3 me-0" href="#">
            The Coding Planet
          </a>
          <form
            role="search"
            className="col-lg-6 justify-content-lg-center d-flex align-items-center gap-2"
          >
            <input
              className="form-control rounded-pill"
              type="search"
              placeholder="&#x1F50E;&#xFE0E; Search"
              aria-label="Search"
            />
          </form>
          <ul className="navbar-nav col-lg-3 d-lg-flex col-lg-3 justify-content-lg-end">
            <li className="nav-item d-lg-block d-sm-none">
              <Link
                className="nav-link active d-flex align-items-center gap-2"
                aria-current="page"
                to="/create"
              >
                <FontAwesomeIcon icon={faPlus} size="lg" />
                Create
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                <FontAwesomeIcon icon={faBell} size="lg" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Register
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
