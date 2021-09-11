import React, { useEffect, useState } from "react";
import "../Styles/checkout.css";
import StripeCheckoutButton from "react-stripe-checkout";
import { useHistory } from "react-router";
import ClipLoader from "react-spinners/ClipLoader";
import DropIn from "braintree-web-drop-in-react";
const CheckOut = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pin, setPin] = useState("");
  const [state, setState] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [productlen, setProductlen] = useState(0);
  const [price, setPrice] = useState(0);
  const [email, setEmail] = useState("");
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState({});

  let len = 0;
  let totalAmount = 0;
  const history = useHistory();

  useEffect(() => {
    fetch("http://localhost:5000/paypal", {
      method: "get",
    })
      .then((res) => res.json())
      .then((res) => setClientToken(res.data.clientToken));
  }, []);

  useEffect(() => {
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
        } else {
          data.user.map((res) => {
            len += parseInt(res.quantity);
            totalAmount += parseInt(res.price) * parseInt(res.quantity);
            setProductlen(len);
            setPrice(totalAmount);
          });

          // console.log(productlen, totalAmount);
          setLoading(false);
        }
      });
  }, []);

  const makePaymentStripe = (token) => {
    setError(false);
    console.log(token);
    token.name = name;
    return fetch("http://localhost:5000/stripe", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        email,
        price,
        name,
        phone,
        address,
        pin,
        state,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setError(false);
        history.push("/");
        console.log(data);
      });
  };
  const makepaypalPayment = () => {
    // let nonce;
    // let getNonce = instance.requestPaymentMethod().then((data) => {
    //   nonce = data.nonce;
    //   const paymentData = {
    //     nonce,
    //     amount: price,
    //   };
    //   processPayment(userId, token, paymentData).then((res) => {
    //     console.log(res);
    //   });
    // });
  };
  return (
    <div>
      <div className="checkout">
        <div className="container">
          <div className="row">
            <div className="col-md d-flex justify-content-center">
              <div style={{ width: "100%" }}>
                <h3 className="mt-5">Biling Details</h3>
                {error ? (
                  <div
                    className="alert alert-danger"
                    role="alert"
                    // style={{ width: "50%" }}
                  >
                    Please Fill All The Details
                  </div>
                ) : (
                  ""
                )}
                <form>
                  <div className="form-group mt-4">
                    <label>Full Name</label>
                    <input
                      type="name"
                      className="form-control mt-2"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="eg. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control mt-2"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="eg. JohnDoe@gmail.com"
                      value={name}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label>Phone Number</label>
                    <input
                      type="number"
                      className="form-control mt-2"
                      id="exampleInputPassword1"
                      placeholder="eg. 1234567890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label>Full Address</label>
                    <textarea
                      type="text"
                      className="form-control mt-2"
                      id="exampleInputPassword1"
                      placeholder="Address"
                      rows="5"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="form-group mt-2">
                    <label>Postal Code</label>
                    <input
                      type="number"
                      className="form-control mt-2"
                      id="exampleInputPassword1"
                      placeholder="Pin code"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label>State</label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      id="exampleInputPassword1"
                      placeholder="eg. West Bengal"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md d-flex justify-content-center mt-3">
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
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="OrderDetails mt-5">
                      {" "}
                      <h3 className="">Order Details</h3>
                      <div className="container">
                        <div className="row mt-5">
                          <div className="col-md d-flex justify-content-center">
                            <h6>Products</h6>
                          </div>
                          <div className="col-md d-flex justify-content-center">
                            <h6>Total</h6>
                          </div>
                        </div>
                        <hr />
                        <div className="row ">
                          <div className="col-md d-flex justify-content-center">
                            Sunglasses x {productlen}
                          </div>
                          <div className="col-md d-flex justify-content-center">
                            ₹ {price}
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-md d-flex justify-content-center">
                            <h5>Subtotal</h5>
                          </div>
                          <div className="col-md d-flex justify-content-center">
                            <h5>₹ {price}</h5>
                          </div>
                        </div>
                        <div className="mt-5 stripebtn d-flex justify-content-center ">
                          <StripeCheckoutButton
                            stripeKey={process.env.REACT_APP_PUBLISHABLE_KEY}
                            token={makePaymentStripe}
                            shippingAddress
                            billingAddress
                            amount={{ price } * 1.41}
                            name="Pay Securely"
                          >
                            <button
                              className="btn btn-warning "
                              style={{
                                borderRadius: "0px",
                                backgroundColor: "#207398",
                                padding: "10px",
                                width: "260px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              Pay with{" "}
                              <i
                                className="fab fa-cc-stripe fa-2x"
                                style={{ marginLeft: "10px" }}
                              ></i>
                            </button>
                          </StripeCheckoutButton>
                        </div>
                      </div>
                    </div>
                    {/* <div
                      className="paypalButton d-flex justify-content-center"
                      style={{ width: "400px" }}
                    >
                      <div>
                        {clientToken ? (
                          <>
                            <DropIn
                              options={{ authorization: clientToken }}
                              onInstance={(instance) => setInstance(instance)}
                            ></DropIn>{" "}
                            <div className="d-flex justify-content-center">
                              {" "}
                              <button
                                className="btn btn-primary"
                                style={{
                                  borderRadius: "0px",
                                  backgroundColor: "#207398",
                                  padding: "10px",
                                  width: "260px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                                onClick={makepaypalPayment}
                              >
                                Pay with{" "}
                                <i
                                  className="fa fa-paypal fa-2x"
                                  aria-hidden="true"
                                  style={{ marginLeft: "10px" }}
                                ></i>
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className="d-flex justify-content-center">
                            {" "}
                            <ClipLoader />
                          </div>
                        )}
                      </div>
                    </div> */}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div style={{ height: "20vh" }}></div>
      </div>
    </div>
  );
};

export default CheckOut;
