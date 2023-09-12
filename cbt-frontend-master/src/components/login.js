import { useState } from "react";
import axios from "axios";
import "../App.css";
import { useHistory } from "react-router-dom";
import NavBar from "./navbar";
import { base_api_url } from "../config";
// const base_api_url = "https://aryaa-cbt-backend.onrender.com";

const LoginPage = () => {
  const history = useHistory();
  const [loginErr, setLoginErr] = useState("");

  const [details, setDetails] = useState({ email: null, password: null });

  const onSubmitHandler = () => {
    axios
      .post(`${base_api_url}/auth/login`, { details })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem(
          "login",
          JSON.stringify({
            token: response.data.token,
            user_id: response.data.user_id,
            username: response.data.username,
            msg: response.data.msg,
          })
        );
        history.push("/");
      })
      .catch((err) => {
        console.log(err.response.data.err);
        const error = err.response.data.err;
        setLoginErr(error);
      });
  };

  const onChangeHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);

    setDetails({ ...details, [name]: value });
  };

  return (
    <>
      <NavBar />
      <section class="vh-90 my-5">
        <div class="container-fluid h-custom">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                class="img-fluid"
                alt="image"
              />
            </div>
            <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              {loginErr ? (
                <div class="alert alert-danger" role="alert">
                  {loginErr}
                </div>
              ) : null}

              <form class="">
                <div class=" d-flex align-items-center justify-content-center my-4">
                  <p class="text-center fw-bold  fs-3 mb-0">Login</p>
                </div>
                <div class="form-outline mb-3">
                  <input
                    type="email"
                    name="email"
                    class="form-control form-control"
                    placeholder="Enter email address"
                    value={details.email}
                    onChange={onChangeHandle}
                  />
                </div>

                <div class="form-outline mb-3">
                  <input
                    type="password"
                    minlength="8"
                    name="password"
                    class="form-control form-control"
                    placeholder="Enter password"
                    value={details.password}
                    onChange={onChangeHandle}
                  />
                </div>

                <div class="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    class="btn btn-primary btn"
                    onClick={onSubmitHandler}
                  >
                    Login
                  </button>
                  <p class="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <div
                      style={{ cursor: "pointer" }}
                      class="d-inline link-danger"
                      onClick={() => history.push("/auth/register")}
                    >
                      Sign up
                    </div>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
