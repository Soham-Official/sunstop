import React, { useEffect, useState } from "react";
import "../Styles/login.css";
import log from "../Images/log.svg";
import register from "../Images/register.svg";
import app from "./FirebaseConfig";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch } from "react-redux";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { addData } from "./actions/actions";
import { Link, useHistory } from "react-router-dom";
const googleprovider = new GoogleAuthProvider();
const facebookprovider = new FacebookAuthProvider();
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  let container;

  useEffect(() => {
    container = document.querySelector(".logincontainer");
    container = container.classList;
  }, []);

  const handleSignUp = () => {
    container = document.querySelector(".logincontainer");
    container = container.classList;
    setEmail("");
    setPassword("");
    setName("");
    container.add("sign-up-mode");
  };
  const handleSignIn = () => {
    container = document.querySelector(".logincontainer");
    container = container.classList;
    container.remove("sign-up-mode");
    setEmail("");
    setPassword("");
    setName("");
  };
  const loginUser = () => {
    if (!email || !password) return setError("Fill all the details!");
    else {
      setEmail("");
      setPassword("");
      setName("");
      setError("");
      setLoading(true);
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          fetch("http://localhost:5000/signin", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              signupUID: user.user.uid,
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              setLoading(false);
              setSucess("Login Successfull.");
              setError("");
              localStorage.setItem("token", res.token);
              dispatch(addData(res));
              history.push("/");
            });
        })
        .catch((err) => {
          setLoading(false);
          if (err.code === "auth/invalid-email") {
            return setError("Invalid Email");
          } else {
            setError("Invalid Credentials");
          }
        });
    }
  };
  const signupUser = () => {
    if (!email || !password || !name) return setError("Fill the the details!");
    else {
      setError("");
      setEmail("");
      setPassword("");
      setName("");
      setLoading(true);
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          fetch("http://localhost:5000/signup", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              signupUID: user.user.uid,
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              // console.log(res);
              setLoading(false);
              setSucess("Successfully Created.");
              setError("");
              container = document.querySelector(".logincontainer");
              container = container.classList;
              container.remove("sign-up-mode");
            });
        })
        .catch((err) => {
          setLoading(false);
          container = document.querySelector(".logincontainer");
          container = container.classList;
          container.add("sign-up-mode");
          if (err.code === "auth/weak-password") {
            return setError("Weak Password");
          }
          if (err.code === "auth/invalid-email") {
            return setError("Invalid Email");
          }
          if (err.code === "auth/email-already-in-use") {
            return setError("Email already Registered.");
          } else {
            setError("Uncuaght Error Please Try again.");
          }
        });
    }
  };
  const signUpWithGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleprovider)
      .then((result) => {
        const user = result.user;
        fetch("http://localhost:5000/signup", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: user.displayName,
            signupUID: user.uid,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            // console.log(res);
            setLoading(false);
            setSucess("Successfully Created.");
            setError("");
            container = document.querySelector(".logincontainer");
            container = container.classList;
            container.remove("sign-up-mode");
          });
      })
      .catch((error) => {
        container = document.querySelector(".logincontainer");
        container = container.classList;
        container.add("sign-up-mode");
        setError(error.message);
      });
  };
  const signInWithGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleprovider)
      .then((result) => {
        const user = result.user;
        fetch("http://localhost:5000/signin", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            signupUID: user.uid,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.err) {
              return setError(res.err);
            }
            // console.log(res.token);
            setSucess("Login Successfull.");
            setError("");
            localStorage.setItem("token", res.token);

            dispatch(addData(res));

            history.push("/");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const signUpWithFacebook = () => {
    const auth = getAuth();
    signInWithPopup(auth, facebookprovider)
      .then((result) => {
        const user = result.user;
        fetch("http://localhost:5000/signup", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: user.displayName,
            signupUID: user.uid,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            // console.log(res);
            setLoading(false);
            setSucess("Successfully Created.");
            setError("");
            container = document.querySelector(".logincontainer");
            container = container.classList;
            container.remove("sign-up-mode");
          });
      })
      .catch((error) => {
        container = document.querySelector(".logincontainer");
        container = container.classList;
        container.add("sign-up-mode");
        setError(error.message);
      })
      .catch((err) => console.log(err));
  };
  const signInWithFacebook = () => {
    const auth = getAuth();
    signInWithPopup(auth, facebookprovider)
      .then((result) => {
        const user = result.user;
        fetch("http://localhost:5000/signin", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            signupUID: user.uid,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.err) {
              return setError(res.err);
            }
            // console.log(res);
            setSucess("Login Successfull.");
            setError("");
            localStorage.setItem("token", res.token);

            dispatch(addData(res));
            history.push("/");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      {/* <Navbar color="#207398" /> */}
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
        <div className="logincontainer">
          <div className="forms-container">
            <div className="signin-signup">
              <div className="sign-in-form form">
                {error ? (
                  <div
                    className="alert alert-danger"
                    role="alert"
                    style={{ width: "50%" }}
                  >
                    {error}
                  </div>
                ) : (
                  ""
                )}
                {sucess ? (
                  <div
                    className="alert alert-success"
                    role="alert"
                    style={{ width: "50%" }}
                  >
                    {sucess}
                  </div>
                ) : (
                  ""
                )}
                <h2 className="title">Sign in</h2>
                <div className="input-field">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Login"
                  className="btn solid"
                  onClick={loginUser}
                />

                <p className="social-text">Or Sign in with social platforms</p>
                <div className="social-media">
                  <div
                    className="social-icon"
                    onClick={signInWithFacebook}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fab fa-facebook-f"></i>
                  </div>

                  <div
                    className="social-icon"
                    onClick={signInWithGoogle}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fab fa-google"></i>
                  </div>
                </div>
              </div>
              <div className="sign-up-form form">
                {error ? (
                  <div
                    className="alert alert-danger"
                    role="alert"
                    style={{ width: "50%" }}
                  >
                    {error}
                  </div>
                ) : (
                  ""
                )}
                <h2 className="title">Sign up</h2>
                <div className="input-field">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  className="btn"
                  value="Sign up"
                  onClick={signupUser}
                />
                <p className="social-text">Or Sign up with social platforms</p>
                <div className="social-media">
                  <div
                    className="social-icon"
                    style={{ cursor: "pointer" }}
                    onClick={signUpWithFacebook}
                  >
                    <i className="fab fa-facebook-f"></i>
                  </div>

                  <div
                    className="social-icon"
                    onClick={signUpWithGoogle}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fab fa-google"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="panels-container">
            <div className="panel left-panel">
              <div className="content">
                <h3>New User?</h3>
                <p>
                  Dont worry! you just a step away from joining our Family &
                  experiencing the latest Eyewears with best quality.We are
                  thanful for choosing us.
                </p>
                <button
                  className="btn transparent"
                  id="sign-up-btn"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
              </div>
              <img src={log} className="image" alt="" />
            </div>
            <div className="panel right-panel">
              <div className="content">
                <h3>One of us ?</h3>
                <p>
                  Hurry up , login & see our latest products with best offers.
                </p>
                <button
                  className="btn transparent"
                  id="sign-in-btn"
                  onClick={handleSignIn}
                >
                  Sign in
                </button>
              </div>
              <img src={register} className="image" alt="" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
