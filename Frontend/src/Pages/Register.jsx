import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setpwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const res = await axios.post(
        import.meta.env.VITE_REGISTER_URL,
        {
          Email: email,
          Username: user,
          Password: pwd,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      navigate("/login");
    } catch (err) {
      if (!err?.res) {
        setErrMsg("No Server Response");
      } else if (err.res?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <p
            ref={errRef}
            className={
              errMsg ? "bg-danger-subtle text-dark fw-bold p-1 mb-1" : "d-none"
            }
          >
            {errMsg}
          </p>
          <h1 className="text-center mt-5">Register</h1>
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://img.freepik.com/free-vector/linear-web-development-
              illustration_1257-357.jpg?t=st=1737036457~exp=1737040057~hmac
              =e53b6df09a7e8491a7ce315e47d7555c1e58ec4d9ab8c56bb005ccb72e27
              d043&w=740"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3">
                  Username:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validName ? "text-success ms-1" : "d-none"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={
                      validName || !user ? "d-none" : "text-danger ms-1"
                    }
                  />
                </label>
                <input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  className="form-control form-control-lg"
                  placeholder="Enter username"
                />
                <p
                  id="uidnote"
                  className={
                    userFocus && user && !validName ? "mt-1" : "d-none"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} className="me-1" />4 to
                  24 characters. Must begin with a letter. Letters, numbers,
                  underscores, hyphens allowed.
                </p>
              </div>

              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3">
                  Email address
                </label>
                <input
                  type="email"
                  id="registerEmail"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="emailnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  className="form-control form-control-lg"
                  placeholder="johndoe@example.com"
                />
                <p
                  id="emailnote"
                  className={
                    emailFocus && email && !validEmail ? "mt-1" : "d-none"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} className="me-1" />
                  Please enter an accepted email
                </p>
              </div>

              <div data-mdb-input-init className="form-outline mb-3">
                <label className="form-label" htmlFor="password">
                  Password:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validPwd ? "text-success ms-1" : "d-none"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={!pwd || validPwd ? "d-none" : "text-danger ms-1"}
                  />
                </label>
                <input
                  type="password"
                  id="registerPwd"
                  onChange={(e) => setpwd(e.target.value)}
                  value={pwd}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                />
                <p
                  id="pwdnote"
                  className={pwdFocus && !validPwd ? "mt-1" : "d-none"}
                >
                  <FontAwesomeIcon icon={faInfoCircle} className="me-1" />8 to
                  24 characters. Must include uppercase and lowercase letters, a
                  number, and a special character. Allowed special characters:
                  <span aria-label="exclamation mark">!</span>
                  <span aria-label="at symbol">@</span>
                  <span aria-label="hashtag">#</span>
                  <span aria-label="dollar sign">$</span>
                  <span aria-label="percent">%</span>
                </p>
              </div>

              <div data-mdb-input-init className="form-outline mb-3">
                <label className="form-label" htmlFor="confirmPwd">
                  Confirm Password:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={
                      validMatch && matchPwd ? "text-success ms-1" : "d-none"
                    }
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={
                      validMatch || !matchPwd ? "d-none" : "text-danger ms-1"
                    }
                  />
                </label>
                <input
                  type="password"
                  id="confirmPwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                />
                <p
                  id="confrimnote"
                  className={matchFocus && !validMatch ? "mt-1" : "d-none"}
                >
                  <FontAwesomeIcon icon={faInfoCircle} className="me-1" />
                  Passwords not matching
                </p>
              </div>

              <div className="d-flex justify-content-end align-items-center">
                <a href="#!">Forgot password?</a>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  disabled={
                    !validName || !validPwd || !validMatch ? true : false
                  }
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem ", paddingRight: "2.5rem" }}
                >
                  Register
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already Have an Account?
                  <Link to="/login" className="link-danger ms-1">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
