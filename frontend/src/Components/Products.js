import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import "../Styles/products.css";
import Footer from "./Footer";
const Products = () => {
  const [dropdown, setDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [dropdownText, setDropdownText] = useState("Sort by Latest");
  const [showButton, setShowButton] = useState(true);
  const [sucess, setSuccess] = useState(false);

  const history = useHistory();
  useEffect(() => {
    fetch("http://localhost:5000/allproducts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startIndex: 0,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.user);
        setLoading(false);
      });
  }, []);
  const showMore = () => {
    setSuccess(false);
    setLoading(true);
    fetch("http://localhost:5000/allproducts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startIndex: products.length,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user.length === 0) {
          setShowButton(false);
        }
        setProducts([...products, ...data.user]);

        setLoading(false);
      });
  };
  const addToCart = (e, name, imageurl, price, productId) => {
    e.preventDefault();
    setSuccess(false);
    const token = localStorage.getItem("token");
    if (!token) {
      return history.push("/login");
    }
    fetch("http://localhost:5000/addtocart", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        name: name,
        url: imageurl,
        price: price,
        productId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setSuccess(true);
      });
  };
  return (
    <div className="">
      <div className="products">
        <div className="container">
          <div className="row " style={{ marginTop: "10vh" }}>
            <div className="col-md productHeading">
              <div
                style={{ fontWeight: "bold", float: "left" }}
                className="featuredLabel text-center "
              >
                <div>All Products</div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div className="featuredLabelBorder mt-2"></div>
                </div>
              </div>
            </div>
            <div className="col-md productHeading">
              <div className="sorting text-center" style={{ float: "right" }}>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded={!dropdown ? true : false}
                    onClick={() => setDropdown(!dropdown)}
                    style={{ width: "200px" }}
                  >
                    {dropdownText}
                  </button>
                  <ul
                    className={`${dropdown ? "show" : ""} dropdown-menu`}
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <p
                        className="dropdown-item"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setDropdownText("Sort by latest");
                          setDropdown(false);
                        }}
                      >
                        Sort by latest
                      </p>
                    </li>
                    <li>
                      <p
                        className="dropdown-item"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setDropdownText(" Sort by price");
                          setDropdown(false);
                        }}
                      >
                        Sort by price
                      </p>
                    </li>
                    <li>
                      <p
                        className="dropdown-item"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setDropdownText("Sort by popularity");
                          setDropdown(false);
                        }}
                      >
                        Sort by popularity
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          {sucess ? (
            <div
              className="alert alert-success"
              role="alert"
              // style={{ width: "50%" }}
            >
              Added To Cart
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="container mt-5">
          <div className="row ">
            {loading ? (
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
            ) : (
              <>
                {products.map((data, i) => {
                  return (
                    <div
                      className="col-md pb-5 d-flex justify-content-center "
                      key={new Date().toISOString() + i}
                    >
                      <Link className="link" to={"/details/" + data._id}>
                        <div
                          className="card  galleryProducts"
                          style={{ height: "400px" }}
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
                              <p>₹ {data.price}</p>
                            </div>
                            <div
                              className="btn btn-outline-success"
                              style={{
                                borderRadius: "0px",
                                backgroundColor: "green",
                                padding: "10px",
                                width: "260px",
                              }}
                              onClick={(e) => {
                                {
                                  addToCart(
                                    e,
                                    data.name,
                                    data.imageurl,
                                    data.price,
                                    data._id
                                  );
                                }
                              }}
                            >
                              Add to Cart{" "}
                              <i className="fa fa-shopping-cart"></i>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          {showButton ? (
            <div className="d-flex justify-content-center">
              {" "}
              <button className="button  btn-success" onClick={showMore}>
                Show More
              </button>
            </div>
          ) : (
            ""
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Products;
