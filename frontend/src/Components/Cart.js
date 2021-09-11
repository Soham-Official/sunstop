import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import "../Styles/cart.css";

const Cart = () => {
  let subtotal = 0;
  const [sucess, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [empty, setEmpty] = useState(false);

  const history = useHistory();
  const cartItems = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return history.push("/login");
    }
    fetch("http://localhost:5000/cartitems", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
          localStorage.removeItem("token");
          return history.push("/login");
        }
        setItems(data.user);
        if (data.user.length === 0) {
          setEmpty(true);
        }
        setLoading(false);
      });
  };
  useEffect(() => {
    cartItems();
  }, []);
  const handleDelete = (id) => {
    setSuccess(false);
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/deletefromcart", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        productId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setSuccess(true);
        cartItems();
      });
  };
  return (
    <div>
      <div className="cart">
        <div className="container ">
          <div>
            <h1 className="text-center mt-5">Cart</h1>
          </div>
        </div>
        {sucess ? (
          <div className="container">
            {" "}
            <div
              className="alert alert-success"
              role="alert"
              // style={{ width: "50%" }}
            >
              Removed
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="container mt-5">
          <div
            className="row  text-white p-3"
            style={{ background: "#e07c24", borderRadius: "5px" }}
          >
            <div className="col  d-flex justify-content-center">
              Product Details
            </div>
            <div className="col  d-flex justify-content-center">Quantity</div>
            <div className="col  d-flex justify-content-center">Subtotal</div>
          </div>

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
              {empty ? <h3>Cart is empty</h3> : ""}
              {items.map((data, i) => {
                subtotal += parseInt(data.quantity) * parseInt(data.price);
                return (
                  <div
                    className="row mt-3 ItenRow"
                    key={new Date().toISOString() + i}
                  >
                    <div className="col  d-flex  ">
                      <img src={data.url} className="cartImg" />
                      <div>
                        <h6>{data.name}</h6>
                        <p>₹ {data.price}</p>
                        <h6
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDelete(data.productId)}
                        >
                          Remove
                        </h6>
                      </div>
                    </div>
                    <div className="col  d-flex justify-content-center">
                      <input
                        type="number"
                        value={data.quantity}
                        disabled
                        className="cartInput"
                      />
                    </div>
                    <div className="col  d-flex justify-content-center">
                      {parseInt(data.quantity) * parseInt(data.price)}
                    </div>
                  </div>
                );
              })}
            </>
          )}

          <div className="row">
            <div className="col-md"></div>
            <div className="col-md d-flex justify-content-center">
              <div className="cartCalculation mt-5">
                <div className="row mt-5">
                  <div className="col">Subtotal</div>
                  <div className="col d-flex justify-content-center">
                    ₹ {subtotal}
                  </div>
                </div>
                <div className="row d-flex justify-content-center mt-5">
                  {empty ? (
                    <button
                      className="btn btn-secondary"
                      disabled
                      style={{ width: "250px", background: "#e07c24" }}
                    >
                      Proceed to Checkout
                    </button>
                  ) : (
                    <Link
                      className="d-flex justify-content-center link"
                      to="/checkout"
                    >
                      <button
                        className="btn btn-secondary"
                        style={{ width: "250px", background: "#e07c24" }}
                      >
                        Proceed to Checkout
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: "10vh" }}></div>
      </div>
    </div>
  );
};

export default Cart;
