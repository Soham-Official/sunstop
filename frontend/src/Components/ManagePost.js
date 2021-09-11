import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../Styles/managepost.css";
const ManagePost = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const data = useSelector((data) => data.addReducer);
  const [products, setProducts] = useState([]);
  const loadData = () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    if (!token) {
      history.push("/login");
    } else {
      fetch("http://localhost:5000/getallproducts", {
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
            // console.log(res.user);
            setProducts(res.user);
            setLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/delete", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
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
          loadData();
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="dashboard">
        {!loading ? (
          <>
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
            <div className="container">
              <div className="py-5 text-center">
                <div className="col">
                  <h4>All Products</h4>
                  <p classs="lead">Manage your products from here.</p>
                </div>
              </div>
            </div>
            <div className="container ">
              <div className="row ">
                {products.map((data, i) => {
                  return (
                    <div
                      className="col-md pb-5 d-flex justify-content-center "
                      key={new Date().toISOString() + i}
                    >
                      <div className="link">
                        <div
                          className="card galleryManage "
                          style={{ height: "380px" }}
                        >
                          <img
                            alt="alt"
                            src={data.imageurl}
                            className="card-img-top imggqallery"
                          />
                          <div className="card-body">
                            <h5 className="card-title">{data.name}</h5>
                            <div className="card-text">
                              <span className="fa fa-star checked"></span>
                              <span className="fa fa-star checked"></span>
                              <span className="fa fa-star checked"></span>
                              <span className="fa fa-star checked"></span>
                              <span className="fa fa-star"></span>
                              <p>{data.price}</p>
                            </div>
                            <div className="d-flex justify-content-between p-3">
                              <Link className="link" to={"/edit/" + data._id}>
                                <i className="fa fa-edit fa-2x text-success"></i>
                              </Link>
                              <div
                                onClick={() => handleDelete(data._id)}
                                style={{ cursor: "pointer" }}
                              >
                                <i className="fa fa-trash-o fa-2x text-danger"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{ height: "10vh" }}></div>
          </>
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
    </div>
  );
};

export default ManagePost;
