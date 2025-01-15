import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faList,
  faArrowTrendUp,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className="d-flex flex-column align-items-start flex-shrink-0 col-lg-2 bg-none border-end border-dark">
      <ul className="nav nav-pills flex-column mb-auto gap-3 mt-3 ms-lg-3 col-lg-10">
        <li className="nav-item">
          <Link
            to="/"
            className="nav-link active bg-dark-subtle text-black d-flex align-items-center gap-3"
            aria-current="page"
          >
            <FontAwesomeIcon icon={faHouse} />
            <span className="d-lg-block d-sm-none">Home</span>
          </Link>
        </li>
        <li>
          <a
            href="#"
            className="nav-link text-black d-flex align-items-center gap-3"
          >
            <FontAwesomeIcon icon={faArrowTrendUp} />
            <span className="d-lg-block d-sm-none">Trending</span>
          </a>
        </li>

        <li>
          <a
            href="#"
            className="nav-link text-black d-flex align-items-center gap-3"
          >
            <FontAwesomeIcon icon={faGlobe} />
            <span className="d-lg-block d-sm-none">All</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="nav-link text-black d-flex align-items-center gap-3"
          >
            <FontAwesomeIcon icon={faList} />
            <span className="d-lg-block d-sm-none">By Category</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
