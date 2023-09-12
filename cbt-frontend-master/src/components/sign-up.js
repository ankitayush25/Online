import { useState } from "react";
import NavBar from "./navbar";
import "../App.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { base_api_url } from "../config";
// const base_api_url = "https://aryaa-cbt-backend.onrender.com";

const SignUpPage = (props) => {
  const history = useHistory();
  const [sqlerr, setSqlerr] = useState("");
  const [success, setSuccess] = useState("");
  const [validation, setValidation] = useState({ errMsg: "" });
  const [details, setDetails] = useState({
    username: null,
    email: null,
    password: null,
    confirm_password: null,
  });

  const onChangeHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);

    setDetails({ ...details, [name]: value });

    setValidation({ errMsg: "" });
    setSqlerr("");
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (details.confirm_password != details.password) {
      setValidation({ errMsg: "Password does not match!!!" });
      return;
    }

    // console.log("Details============", details);

    axios
      .post(`${base_api_url}/auth/register`, { details })
      .then((response) => {
        console.log(response.data);
        setSuccess(response.data.msg);

        setDetails({
          username: "",
          email: "",
          password: "",
          confirm_password: "",
        });

        // go to login page
        alert("Register Successfully !!!");
        history.push("/auth/login");
      })
      .catch((err) => {
        console.log(err);
        setSqlerr(err.response.data.err);
        // setSqlerr(err);
        // return;
        // console.log(err);
      });
  };

  return (
    <>
      <NavBar />
      <section class="vh-90 my-3">
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
              <form class="" onSubmit={onSubmitHandler}>
                <div class=" d-flex align-items-center justify-content-center my-4">
                  <p class="text-center fw-bold  fs-3 mb-0">Sign Up</p>
                </div>

                {validation.errMsg ? (
                  <div class="alert alert-danger" role="alert">
                    {validation.errMsg}
                  </div>
                ) : null}

                {sqlerr ? (
                  <div class="alert alert-danger" role="alert">
                    {sqlerr}
                  </div>
                ) : null}

                {success ? (
                  <div class="alert alert-success" role="alert">
                    {success}
                  </div>
                ) : null}

                <div class="form-outline mb-3">
                  <input
                    type="text"
                    name="username"
                    class="form-control form-control"
                    placeholder="Username"
                    onChange={onChangeHandle}
                    value={details.username}
                    required
                  />
                </div>

                <div class="form-outline mb-3">
                  <input
                    type="email"
                    name="email"
                    class="form-control form-control"
                    placeholder="Email address"
                    onChange={onChangeHandle}
                    value={details.email}
                    required
                  />
                </div>

                <div class="form-outline mb-3">
                  <input
                    type="password"
                    minlength="8"
                    name="password"
                    class="form-control form-control"
                    placeholder="Password"
                    value={details.password}
                    onChange={onChangeHandle}
                    required
                  />
                </div>

                <div class="form-outline mb-3">
                  <input
                    type="password"
                    minlength="8"
                    name="confirm_password"
                    class="form-control form-control"
                    placeholder="Confirm password"
                    value={details.confirm_password}
                    onChange={onChangeHandle}
                    required
                  />
                </div>

                <div class="text-center text-lg-start mt-4 pt-2">
                  <button type="submit" class="btn btn-primary btn">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUpPage;
