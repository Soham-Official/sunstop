import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ClipLoader from "react-spinners/ClipLoader";
import "../Styles/productDetails.css";
const ProductDetails = ({ match }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [sellername, setSellerName] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [err, setErr] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [tryonready, setTryOnReady] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [dropdownText, setDropdownText] = useState("No of Items");
  const [tryonloading, setTryOnLoading] = useState(true);
  const [recievedimg, setRecievedImg] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/login");
    } else {
      fetch("http://localhost:5000/getproductDetails", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: match.params.id,
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
            setName(res.user.name);
            setSellerName(res.user.sellername);
            setStock(res.user.stock);
            setUrl(res.user.imageurl);
            setPrice(res.user.price);
            setDescription(res.user.description);
            setLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);
  const handleAddToCart = () => {
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
        url: url,
        price: price,
        productId: match.params.id,
        quantity: parseInt(dropdownText),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setSuccess(true);
      });
  };
  const handleTryOn = () => {
    setErr("");
    if (!image) {
      setImage("");
      return setErr("Please Select a Image");
    }

    if (
      image.name.split(".")[1] !== "jpeg" &&
      image.name.split(".")[1] !== "jpg" &&
      image.name.split(".")[1] !== "png"
    ) {
      return setErr("Please Provider image with jpeg,jpg,png format.");
    }
    setTryOnReady(true);
    let formData = new FormData();
    formData.append("image", image);
    let x = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    fetch(`http://localhost:18000/tryon${x}`, {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        setImage("");
        if (res === "ERROR") {
          setTryOnReady(false);
          return setErr(
            "Inappropriate Image , try providing a clear , font facing , straight image."
          );
        }
        setRecievedImg(res.url);
        setTryOnLoading(false);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
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
          {tryonready ? (
            <>
              {tryonloading ? (
                <div
                  style={{
                    display: "flex",
                    height: "100vh",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                  }}
                >
                  <div>
                    <h3 className="text-center">
                      Your Image is Being Processed, Please Wait!
                    </h3>
                    <div className="text-center">
                      <ClipLoader color="#e07c24" size={150} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="tryonDiv">
                  <div>
                    <h4 className="text-center fonti">
                      Your Try On Image Is Ready!!!!!
                    </h4>
                    <div className=" mt-3 ">
                      <div className="card  ">
                        <img
                          alt="alt"
                          src={recievedimg}
                          className="card-img-top tryonImage"
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between ">
                      <button
                        className="add-to-cart fonti"
                        onClick={() => handleAddToCart()}
                      >
                        Add To Cart{" "}
                        <i
                          className="fa fa-shopping-cart "
                          style={{ marginLeft: "5px" }}
                        ></i>
                      </button>
                      <button
                        className="add-to-cart fonti"
                        style={{ background: "#3DBE29" }}
                        onClick={() => {
                          setTryOnLoading(true);
                          setTryOnReady(false);
                        }}
                      >
                        Retry
                        <i
                          className="fa fa-repeat"
                          style={{ marginLeft: "5px" }}
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="productDetails">
              <div className="container">
                {success ? (
                  <div
                    className="alert alert-success mt-3"
                    role="alert"
                    // style={{ width: "50%" }}
                  >
                    Added To Cart
                  </div>
                ) : (
                  ""
                )}
                {err ? (
                  <div
                    className="alert alert-danger mt-3"
                    role="alert"
                    // style={{ width: "50%" }}
                  >
                    {err}
                  </div>
                ) : (
                  ""
                )}
                <div className="row " style={{ marginTop: "12vh" }}>
                  <div className="col-md d-flex justify-content-center">
                    <div
                      className="card gallery galleryProductsDetails"
                      style={{ width: "30rem", height: "30rem" }}
                    >
                      <img src={url} className="card-img-top" alt="alt" />
                    </div>
                  </div>
                  <div className="col-md p-3 ">
                    <div>
                      <h1 className="productName ">
                        <b>{name}</b>
                      </h1>
                      <h5>{description}</h5>
                      <div className="mt-3">
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                      </div>
                      <hr />
                      <h1 className="mt-3">₹ {price}</h1>
                      <div className="d-flex justify-content-around res">
                        <div className="dropdown mt-3 ">
                          <button
                            className="btn btn-secondary dropdown-toggle fonti"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded={!dropdown ? true : false}
                            onClick={() => setDropdown(!dropdown)}
                            style={{ width: "180px" }}
                          >
                            {dropdownText}
                          </button>
                          <ul
                            className={`${
                              dropdown ? "show" : ""
                            } dropdown-menu`}
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li>
                              <p
                                className="dropdown-item"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setDropdownText("1");
                                  setDropdown(false);
                                }}
                              >
                                1
                              </p>
                            </li>
                            <li>
                              <p
                                className="dropdown-item"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setDropdownText("2");
                                  setDropdown(false);
                                }}
                              >
                                2
                              </p>
                            </li>
                            <li>
                              <p
                                className="dropdown-item"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setDropdownText("3");
                                  setDropdown(false);
                                }}
                              >
                                3
                              </p>
                            </li>
                            <li>
                              <p
                                className="dropdown-item"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setDropdownText("3");
                                  setDropdown(false);
                                }}
                              >
                                3
                              </p>
                            </li>
                            <li>
                              <p
                                className="dropdown-item"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setDropdownText("3");
                                  setDropdown(false);
                                }}
                              >
                                4
                              </p>
                            </li>
                            <li>
                              <p
                                className="dropdown-item"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setDropdownText("3");
                                  setDropdown(false);
                                }}
                              >
                                5
                              </p>
                            </li>
                            <li>
                              <p
                                className="dropdown-item"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setDropdownText("3");
                                  setDropdown(false);
                                }}
                              >
                                6
                              </p>
                            </li>
                          </ul>
                        </div>
                        <div className="mt-3 ">
                          <label className="label fonti">
                            {" "}
                            Upload a Image{" "}
                            {image ? (
                              <i
                                className="fa fa-check"
                                style={{
                                  marginLeft: "5px",
                                  background: "#3DBE29",
                                }}
                              ></i>
                            ) : (
                              <i
                                className="fa fa-camera"
                                style={{ marginLeft: "5px" }}
                              ></i>
                            )}
                            <input
                              type="file"
                              size="60"
                              className="vt"
                              onChange={(e) => {
                                setImage(e.target.files[0]);
                                console.log(image);
                              }}
                            />
                          </label>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <button
                          className="add-to-cart fonti"
                          onClick={() => handleAddToCart()}
                        >
                          Add To Cart{" "}
                          <i
                            className="fa fa-shopping-cart "
                            style={{ marginLeft: "5px" }}
                          ></i>
                        </button>

                        <button
                          className="add-to-cart fonti"
                          style={{ background: "#3DBE29" }}
                          onClick={handleTryOn}
                        >
                          Virtual Try On{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ height: "15vh" }}></div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductDetails;
