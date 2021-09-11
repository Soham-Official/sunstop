import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Contact from "./Components/Contact";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Products from "./Components/Products";
import { addData } from "./Components/actions/actions";
import ClipLoader from "react-spinners/ClipLoader";
import Dashboard from "./Components/Dashboard";
import AddPost from "./Components/AddPost";
import ManagePost from "./Components/ManagePost";
import EditProduct from "./Components/EditProduct";
import ProductDetails from "./Components/ProductDetails";
import Cart from "./Components/Cart";
import CheckOut from "./Components/CheckOut";

const Router = () => {
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
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
            setFlag(true);
            return localStorage.removeItem("token");
          }
          const data = {
            name: res.name,
            role: res.role,
          };
          // console.log(data);
          dispatch(addData(data));
          setFlag(true);
        })
        .catch((err) => console.log(err));
    } else {
      setFlag(true);
    }
  });

  return (
    <BrowserRouter>
      {flag ? (
        <>
          <Navbar color="#207398" />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/addpost" component={AddPost} />
            <Route exact path="/managepost" component={ManagePost} />
            <Route exact path="/edit/:id" component={EditProduct} />
            <Route exact path="/details/:id" component={ProductDetails} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={CheckOut} />
          </Switch>
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
    </BrowserRouter>
  );
};
export default Router;
