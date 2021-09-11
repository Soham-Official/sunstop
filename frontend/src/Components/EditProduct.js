import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";

const EditProduct = ({ match }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [sellername, setSellerName] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [err, setErr] = useState("");
  const [url, setUrl] = useState("");
  const [success, setSuccess] = useState(false);
  const data = useSelector((data) => data.addReducer);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");
    setSuccess("");
    if (!name || !sellername || !stock || !price || !url || !description) {
      return setErr("Please Fill all the field");
    }
    setLoading(true);
    let formData = new FormData();
    formData.append("file", url);
    formData.append("upload_preset", "sunstop");
    formData.append("cloud_name", "samrat-chakraborty2000-gmail-com");
    fetch(
      "https://api.cloudinary.com/v1_1/samrat-chakraborty2000-gmail-com/image/upload",
      {
        method: "post",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:5000/addproduct", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            sellername,
            stock,
            imageurl: data.url,
            price,
            description,
            token: token,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            setSuccess(true);
            setLoading(false);
            setName("");
            setDescription("");
            setErr("");
            setPrice("");
            setSellerName("");
            setStock("");
            setUrl("");
            history.push("/managepost");
          });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
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
            </div>{" "}
            <div className="container">
              <div className="py-5 text-center">
                <div className="col">
                  <h4>Update Product</h4>
                  <p className="lead">
                    Update existing products of the inventory
                  </p>
                </div>
              </div>
              {err ? (
                <div
                  className="alert alert-danger"
                  role="alert"
                  style={{ width: "50%" }}
                >
                  {err}
                </div>
              ) : (
                ""
              )}
              {success ? (
                <div
                  className="alert alert-success"
                  role="alert"
                  style={{ width: "50%" }}
                >
                  Successfully Added!
                </div>
              ) : (
                ""
              )}
              <div>
                <h4>Product Details</h4>
              </div>

              <form className="needs-validation">
                <div className="row">
                  <div className="col-md-6">
                    <label>Product Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Super Sunglass"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Seller Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={sellername}
                      onChange={(e) => setSellerName(e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label>No of Stock</label>
                  <input
                    type="number"
                    className="form-control"
                    value={stock}
                    onChange={(e) => {
                      setStock(e.target.value);
                    }}
                    placeholder="1"
                  />
                </div>

                <div className="form-row">
                  <div className="row mb-3">
                    <div className="form-group col-md-6">
                      <label>Product Image</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setUrl(e.target.files[0])}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Price</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="₹ 100"
                        value={price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Product Description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    rows="4"
                  ></textarea>
                </div>
                <div className="form-group mt-4">
                  <div className="d-flex justify-content-around">
                    {" "}
                    <button
                      type="submit"
                      className="btn btn-outline-success bg-info"
                      onClick={() => {
                        history.push("/managepost");
                      }}
                    >
                      <i className="fa fa-arrow-left"></i> <span> Back</span>
                    </button>
                    <button
                      type="reset"
                      className="btn btn-outline-danger bg-success"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
              <div style={{ height: "10vh" }}></div>
            </div>
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

export default EditProduct;
