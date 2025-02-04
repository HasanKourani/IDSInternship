import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthProvider";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const { setAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        import.meta.env.VITE_LOGIN_URL,
        {
          Email: email,
          Password: pwd,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const token = res?.data?.token;
      const role = res?.data?.role;
      Cookies.set("authToken", token, { expires: 1, secure: true });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setAuth({ email, pwd, role, token });
      navigate("/");
    } catch (err) {
      if (err.res) {
        setErrMsg(err.res.data);
      } else if (err.request) {
        setErrMsg("Email or Password is Wrong!");
        console.log(err);
      } else {
        setErrMsg("An unkown error");
        console.log(err);
      }
      errRef.current.focus();
    }
  };
  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <h1 className="text-center">LOGIN</h1>
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://img.freepik.com/free-vector/coding-workshop-abstract
              -concept-vector-illustration-code-writing-workshop-online-prog
              ramming-course-app-games-development-class-informatics-lesson-
              software-development-abstract-metaphor_335657-5880.jpg?t=st=17
              37036403~exp=1737040003~hmac=64cb2a7a5a8cd00f41c0b8ae129921585
              0427a18552817ce22b7368e4147be21&w=740"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label fs-5" htmlFor="loginEmail">
                  Email address:
                </label>
                <input
                  type="email"
                  id="loginEmail"
                  ref={userRef}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  className="form-control form-control-lg"
                  placeholder="Enter your email"
                />
              </div>

              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label fs-5" htmlFor="loginPwd">
                  Password:
                </label>
                <input
                  type="password"
                  id="loginPwd"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  className="form-control form-control-lg"
                  placeholder="Your password"
                />
              </div>

              {errMsg && <p className="text-danger">{errMsg}</p>}

              <div className="d-flex justify-content-between align-items-center mb-4">
                <a href="#!">Forgot password?</a>
              </div>

              <button
                type="submit"
                disabled={!email || !pwd}
                data-mdb-button-init
                data-mdb-ripple-init
                className="btn btn-primary btn-lg btn-block"
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
