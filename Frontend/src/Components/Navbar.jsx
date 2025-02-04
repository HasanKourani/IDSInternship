import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../Context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const NavBar = ({ handleSearch }) => {
  const { userDetails } = useContext(UserContext);
  const [validToken, setValidToken] = useState(false);
  const [user, setUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  if (userDetails) {
    const token = Cookies.get("authToken");
    console.log(userDetails);

    useEffect(() => {
      if (token) {
        setValidToken(true);
      } else {
        setValidToken(false);
      }
    }, [token]);

    if (token) {
      useEffect(() => {
        const USER_ID_URL =
          import.meta.env.VITE_GET_USER_ID_URL + userDetails.sub;
        const getProfile = async () => {
          try {
            const res = await axios.get(USER_ID_URL);
            setUser(res.data);
          } catch (error) {
            console.error(error);
          }
        };

        getProfile();
      }, [userDetails, token]);
    }
  }

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
    navigate(`?search=${searchTerm}`, { replace: true });
  };

  const handleLogout = () => {
    Cookies.remove("authToken");
    Navigate("/");
  };

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
          <Link className="navbar-brand col-lg-3 me-0" to="/">
            The Coding Planet
          </Link>
          <form
            role="search"
            className="col-lg-6 justify-content-lg-center d-flex align-items-center gap-2"
            onSubmit={handleSearchSubmit}
          >
            <input
              className="form-control rounded-pill"
              type="search"
              placeholder="&#x1F50E;&#xFE0E; Search tag, categroy, user"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          <ul className="navbar-nav col-lg-3 d-lg-flex col-lg-3 justify-content-lg-end">
            {validToken ? (
              <span className="d-lg-flex">
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
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={{
                      pathname: `/profile/${user.id}`,
                    }}
                  >
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <form onSubmit={handleLogout}>
                    <button
                      type="submit"
                      className="nav-link active d-flex align-items-center gap-2"
                    >
                      Logout
                    </button>
                  </form>
                </li>
              </span>
            ) : (
              <span className="d-lg-flex">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </span>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
