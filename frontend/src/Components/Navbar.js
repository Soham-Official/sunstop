import React, { useEffect, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import "../Styles/navbar.css";
import { getAuth, signOut } from "firebase/auth";
import app from "./FirebaseConfig";
import { useSelector } from "react-redux";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#e07c24" };
  } else {
    return { color: "#fff" };
  }
};
const Navbar = (props) => {
  const history = useHistory();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const color = props.color;

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const truncated = (string) => {
    if (string.length > 10) {
      string = string.substring(0, 11);
      string = string + "..";
      return string.toUpperCase();
    }
    return string.toUpperCase();
  };
  const data = useSelector((data) => data.addReducer);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setName(data.name);
      setRole(data.role);
      // console.log(data.name, data.role);
      setName(truncated(data.name.split(" ")[0]));
      setIsLoggedIn(true);
      // console.log(name);
      // console.log("token");
    } else {
      setIsLoggedIn(false);
    }
  });
  const signout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        history.push("/login");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <nav
        className="navbar navbar-expand-lg "
        style={{ backgroundColor: color }}
      >
        <div className="container navcontainer">
          <div className="navbar-brand">
            <span className="logo1">SUN</span>
            <span className="logo2">STOP</span>
          </div>
          <button
            className="navbar-toggler navbar-dark"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#defaultNavbar1"
            aria-expanded={!isNavCollapsed ? true : false}
            onClick={() => setIsNavCollapsed(!isNavCollapsed)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
            id="defaultNavbar1"
          >
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/"
                  style={currentTab(history, "/")}
                >
                  <i className="fa fa-home"></i> HOME
                </Link>
              </li>
              {isLoggedIn && !role ? (
                <li className="nav-item">
                  <Link
                    to="/dashboard"
                    className="nav-link"
                    style={currentTab(history, "/dashboard")}
                  >
                    <i className="fa fa-bar-chart"></i> DASHBOARD
                  </Link>
                </li>
              ) : (
                ""
              )}
              <li className="nav-item">
                <Link
                  to="/products"
                  className="nav-link"
                  style={currentTab(history, "/products")}
                >
                  <i className="fa fa-bars"></i> PRODUCTS
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/contact"
                  className="nav-link"
                  style={currentTab(history, "/contact")}
                >
                  <i className="fa fa-address-book"></i> CONTACT
                </Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/cart"
                      style={currentTab(history, "/cart")}
                    >
                      <i className="fa fa-shopping-cart"></i>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/"
                      style={currentTab(history, "/notexists")}
                    >
                      {name}
                    </Link>
                  </li>

                  <li className="nav-item">
                    <div
                      className="nav-link"
                      onClick={signout}
                      style={{ color: "#fff", cursor: "pointer" }}
                    >
                      <i className="fa fa-sign-out"></i>
                      {/* LOGOUT */}
                    </div>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                    style={currentTab(history, "/login")}
                  >
                    <i className="fa fa-sign-in"></i> LOGIN / REGISTER
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default withRouter(Navbar);
