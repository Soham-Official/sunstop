import React, { useEffect, useState } from "react";
import "../Styles/home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import featured1 from "../Images/featured1.jpg";
import featured2 from "../Images/featured2.jpg";
import featured3 from "../Images/featured3.jpg";
import { Link } from "react-router-dom";
import tryon_icon from "../Images/tryon_icon.svg";
import Footer from "./Footer";
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState({});

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
        setProducts(data);

        setLoading(false);
      });
  }, []);
  console.log(process.env.REACT_APP_FIREBASE_APIKEY);
  return (
    <>
      <div className="outerHome">
        <div className="body ">
          <header>
            <div className="container ">
              <div className="row">
                <div className="col-lg d-flex justify-content-center">
                  <div className="tagline">
                    <div className="">
                      <div className="heading d-md-flex ">
                        <div className="color3">Beat the heat, </div>
                        <div className="logo1"> this summer!!!</div>
                      </div>
                      <div className="subheading">
                        Premium sunglasses that last.
                      </div>
                      <div className="d-sm-flex mt-5">
                        <div className="col-sm ">
                          <Link to="/products">
                            <button className="button  explorebtn">
                              Explore
                            </button>
                          </Link>
                        </div>
                        <div className="col-sm">
                          <Link to="contact">
                            <button className="button  joinbtn">Join US</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg"></div>
              </div>
            </div>
          </header>
          <div className="containerbody">
            <div className="container mt-5">
              <div className="row">
                <div className="col-md d-flex justify-content-center">
                  <div className="card">
                    <img
                      alt="alt"
                      src={featured2}
                      className="card-img-top cardimg"
                    />
                  </div>
                </div>
                <div className="col-md d-flex justify-content-center">
                  <div className="card">
                    <img
                      alt="alt"
                      src={featured3}
                      className="card-img-top cardimg"
                    />
                  </div>
                </div>
                <div className="col-md d-flex justify-content-center">
                  <div className="card">
                    <img
                      alt="alt"
                      src={featured1}
                      className="card-img-top cardimg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{ marginTop: "60px", fontWeight: "bold" }}
              className="featuredLabel text-center"
            >
              <div>Featured Products</div>
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
                    {products.user.map((data, i) => {
                      return (
                        <div
                          className="col-md pb-5 d-flex justify-content-center "
                          key={new Date().toISOString() + i}
                        >
                          <Link className="link" to={"/details/" + data._id}>
                            <div className="card gallery ">
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
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
            <div className="services-area">
              <div className="wrapper">
                <div className="featuredLabel text-center"> Our Services</div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div className="featuredLabelBorder mt-2"></div>
                </div>

                <div className="items mt-5">
                  <div className="single-item">
                    <div className="item-box">
                      <div className="icon-area">
                        <i className="fa fa-globe"></i>
                      </div>
                      <h3>Worlwide Shipping</h3>
                      <p>
                        We are dealing with customers from all over the world
                        with superfast shipping speed.
                      </p>
                    </div>
                  </div>
                  <div className="single-item">
                    <div className="item-box">
                      <div className="icon-area">
                        <i className="fa fa-star"></i>
                      </div>
                      <h3>Best Quality</h3>
                      <p>
                        We are certified by many recognised international
                        testers. We never compromised with quality.
                      </p>
                    </div>
                  </div>
                  <div className="single-item">
                    <div className="item-box">
                      <div className="icon-area">
                        <i className="fa fa-lock"></i>
                      </div>
                      <h3>Secured Payments</h3>
                      <p>
                        You can directly pay from our website securely and
                        safely.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tryon mt-5 ">
              <div className="container">
                <div className="row align-items-center justify-content-between">
                  <div className="col-sm p-5 justify-content-center d-flex">
                    <img
                      alt="alt"
                      src={tryon_icon}
                      style={{ width: "80%", height: "100%" }}
                    />
                  </div>
                  <div className="col-sm p-5 justify-content-center d-flex">
                    <div>
                      <h5>Exclusively available on Sunstore</h5>
                      <h1>
                        <b>Virtual Try-on</b>
                      </h1>
                      <p>Say goodbye to old-fashioned shoppings!</p>
                      <Link to="/products">
                        <button className="button  explorebtn">Try now</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonials">
              <div className="container">
                <div className="row mt-5 ">
                  <div className="col-md d-flex justify-content-center mb-3 mb-3">
                    <div className="reviewCard">
                      <i className="fa fa-quote-left"></i>
                      <p>
                        Spect is very nice , product material and perfection as
                        brand rayban, glass quality is good, perfect polarize
                        sunglass , style, look, quality, and price perfect ,
                        frame metle is very qualitable .
                      </p>
                      <div className="rating">
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star "></span>
                      </div>
                      <img
                        alt="alt"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEQPCmGspNPzCuZzxyr4ua6vI7m3VUQFeRJWCdLVdiUAXIWkuzAc1HCZSz8G-pkPSH39A&usqp=CAU"
                        className="testimonialCard"
                      />
                      <h3>Jessica</h3>
                    </div>
                  </div>
                  <div className="col-md d-flex justify-content-center mb-3">
                    <div className="reviewCard">
                      <i className="fa fa-quote-left"></i>
                      <p>
                        Excellent for kids of age 6.The quality of the sunglass
                        is too good for the price.Also it is very well packed
                        and comes with beautiful hard case and cleaning cloth.
                      </p>
                      <div className="rating">
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star "></span>
                      </div>
                      <img
                        alt="alt"
                        src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                        className="testimonialCard"
                      />
                      <h3>James</h3>
                    </div>
                  </div>
                  <div className="col-md d-flex justify-content-center mb-3">
                    <div className="reviewCard">
                      <i className="fa fa-quote-left"></i>
                      <p>
                        This sunglass is a Nice one,looks good,retro classic
                        look frame,for elders and youngsters it will suit,for
                        this budjet it's a value for money,original product and
                        package,packed date of product.
                      </p>
                      <div className="rating">
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star "></span>
                      </div>
                      <img
                        alt="alt"
                        src="https://st3.depositphotos.com/9881890/16378/i/600/depositphotos_163785870-stock-photo-blonde-smiling-businesswoman.jpg"
                        className="testimonialCard"
                      />
                      <h3>Angelina</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Footer />
            <div style={{ height: "6vh" }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
