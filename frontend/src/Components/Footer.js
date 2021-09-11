import React from "react";
import "../Styles/footer.css";
const Footer = () => {
  return (
    <div>
      <footer className="footer bg-dark mt-5">
        <div className="cxontainer p-5">
          <div className="row">
            <div className="col-sm d-flex justify-content-center">
              <div style={{ width: "60%" }}>
                {" "}
                <div className="mb-2" style={{ fontSize: "35px" }}>
                  {" "}
                  <span className="logo1">Sun</span>
                  <span className="logo2">stop</span>
                </div>
                <p>
                  Our purpose is to sustainably make the pleasure and benefits
                  of eyewears accesible to many.
                </p>
              </div>
            </div>
            <div className="col-sm d-flex justify-content-center">
              <div>
                <div className="text-white" style={{ fontSize: "25px" }}>
                  Follow Us
                </div>
                <h6 className="mt-3">
                  <a
                    className="link logo1 "
                    href="https://www.linkedin.com/in/soham-chakraborty-69aa70192/"
                  >
                    Linkedin
                  </a>
                </h6>
                <h6>
                  <a
                    className="link logo1 "
                    href="https://github.com/Soham-Official"
                  >
                    Github
                  </a>
                </h6>
                <h6>
                  <a
                    className="link logo1 "
                    href="https://soham-official.github.io/"
                  >
                    Website
                  </a>
                </h6>
                <h6>
                  <a
                    className="link logo1 "
                    href="https://www.facebook.com/official.soham.chakraborty2000/"
                  >
                    Facebook
                  </a>
                </h6>
                <h6>
                  <a
                    className="link logo1 "
                    href="https://www.instagram.com/itssohamhere/"
                  >
                    Instagram
                  </a>
                </h6>
              </div>
            </div>
            <div className="col-sm d-flex justify-content-center">
              <div>
                <div className="text-white" style={{ fontSize: "25px" }}>
                  Contact Us
                </div>
                <h6 className="mt-3">
                  <i className="fa fa-phone"></i> 91 8240143223
                </h6>
                <h6 className="mt-3">
                  <i className="fa fa-envelope"></i>{" "}
                  soham.chakrabortyofficial@gmail.com
                </h6>
                <h6 className="mt-3">
                  <i className="fa fa-map-marker"></i> Kolkata , West Bengal ,
                  India.
                </h6>
              </div>
            </div>
          </div>
          <div className="copyright text-center text-white pt-4">
            Copyright 2021-
            <b>
              {" "}
              <a
                className="link logo1"
                href="https://soham-official.github.io/"
              >
                Soham Chakraborty
              </a>
            </b>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
