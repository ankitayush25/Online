import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const NavBar = () => {
  const history = useHistory();

  const [logout, setLogout] = useState(false);

  const profile = () => {
    history.push("/profile");
  };

  const onLogout = () => {
    console.log("onlogout");
    localStorage.removeItem("login");
    setLogout(true);
    // console.log("pehle=====", history);
    history.push("/");
    // console.log("baad me ======", history);
    // window.addEventListener("popstate", (e) => {
    //   // alert("Your data will be lost!!!");
    //   history.go(1);
    // });
  };

  return (
    <nav className="navbar navbar-dark " style={{ backgroundColor: "#29385c" }}>
      <div className="container-fluid d-flex mw-100">
        {/* <a className="navbar-brand" href="/"> */}
        <Link to="/" className="text-white fs-3 text-decoration-none">
          Computer Based Test
        </Link>
        {/* </a> */}

        {!localStorage.getItem("login") || logout ? (
          <div className="navbar-brand d-flex text-white justify-content-end">
            <div className="mx-3">
              {/* <a className="text-white" href="/auth/login"> */}
              <Link to="/auth/login" className="text-white">
                {" "}
                Login
              </Link>

              {/* </a> */}
            </div>
            <div className="mx-1">
              {/* <a className="text-white" href="/auth/register"> */}
              <Link to="/auth/register" className="text-white">
                Sign Up
              </Link>

              {/* </a> */}
            </div>
          </div>
        ) : (
          <div className="d-flex">
            <div
              role="button"
              className="text-white text-capitalize"
              onClick={profile}
            >{`Hi ${
              JSON.parse(localStorage.getItem("login")).username
            } !`}</div>
            <div
              className="text-white mx-3"
              style={{ cursor: "pointer" }}
              onClick={onLogout}
            >
              <u>Logout</u>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
