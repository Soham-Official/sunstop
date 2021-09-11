import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import "../Styles/dashboard.css";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/login");
    } else {
      fetch("http://localhost:5000/checkState", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.err) {
            localStorage.removeItem("token");
            return history.push("/login");
          }
          if (res.role === 1) {
            return history.push("/");
          } else {
            setLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  });
  const data = useSelector((data) => data.addReducer);
  return (
    <div className="">
      {!loading ? (
        <div className="dashboard">
          <div
            className="container mt-5 mb-3"
            style={{ backgroundColor: "#50DBB4" }}
          >
            <div
              className="p-3 dashboardHeader"
              style={{ alignItems: "center" }}
            >
              <div className="">
                <h4>Admin Dashboard</h4>
                <span style={{ color: "#000" }}>
                  {" "}
                  Manage Your Site From Here
                </span>
              </div>
              <div className="" style={{ fontSize: "18px" }}>
                <span style={{ color: "#000" }}> Welcome ,</span>{" "}
                <b>{data.name}</b>
              </div>
            </div>
          </div>

          <section id="main">
            <div className="container">
              <div className="row mt-5">
                <div className="col-md-3">
                  <div className="list-group ">
                    <div className="list-group-item list-group-item-action active main-color-bg">
                      <span className="fas fa-bars"></span> Dashboard
                    </div>
                    <Link
                      to="/addpost"
                      className="list-group-item list-group-item-action mt-3"
                    >
                      <span className="fa fa-plus"></span> Add Product
                    </Link>
                    <Link
                      to="/managepost"
                      className="list-group-item list-group-item-action mt-1"
                    >
                      <span className="fas fa-pencil-alt"></span> Manage
                      Products{" "}
                    </Link>
                  </div>

                  <br />
                </div>
                <div className="col-md-9">
                  <div className="card">
                    <div className="card-header main-color-bg">
                      <h3 className="card-title">Website Overview</h3>
                    </div>
                    <div className="card-body mt-3">
                      <div className="row">
                        <div className="col-md">
                          <div className="card dash-box p-4 bg-danger text-white">
                            <div className="card-body">
                              <h2>
                                <span className="fas fa-user fa-2x text-dark"></span>{" "}
                                {"  "}
                                <span style={{ fontSize: "60px" }}>12</span>
                              </h2>
                              <h5>Users</h5>
                            </div>
                          </div>
                        </div>
                        <div className="col-md">
                          <div className="card dash-box p-4 bg-success text-white">
                            <div className="card-body">
                              <h2>
                                <span className="fas fa-list-alt fa-2x text-dark"></span>{" "}
                                {"  "}
                                <span style={{ fontSize: "60px" }}>12</span>
                              </h2>
                              <h5>Pages</h5>
                            </div>
                          </div>
                        </div>
                        <div className="col-md">
                          <div className="card dash-box p-4 bg-info text-white">
                            <div className="card-body">
                              <h2>
                                <span className="fas fa-glasses fa-2x text-dark"></span>
                                {"  "}
                                <span style={{ fontSize: "60px" }}>20</span>
                              </h2>
                              <h5>Products</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <br />
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <ClipLoader color="#e07c24" size={150} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
