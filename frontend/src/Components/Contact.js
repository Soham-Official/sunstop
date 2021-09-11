import React, { useState } from "react";
import emailjs, { send } from "emailjs-com";
import "../Styles/contact.css";

const Contact = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendmail = (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);
    emailjs
      .sendForm(
        "service_g2bfq89",
        "template_k6uf91t",
        e.target,
        "user_xWLno29DqSpTBVGvUPyZz"
      )
      .then(
        (result) => {
          console.log(result.text);
          setSuccess(true);
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div>
      <div className="contact">
        <div className="container">
          <section className="contact-page-section">
            <div className="container">
              <div className="sec-title">
                <h2>Let's Get in Touch.</h2>
                {error ? (
                  <div className="alert alert-danger" role="alert">
                    Please add all the fields.
                  </div>
                ) : (
                  ""
                )}
                {success ? (
                  <div className="alert alert-success" role="alert">
                    Successfully Sent.
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="inner-container">
                <div className="row clearfix">
                  <div className="form-column col-md-8 col-sm-12 col-xs-12">
                    <div className="inner-column">
                      <div className="contact-form">
                        <form onSubmit={sendmail}>
                          <div className="row clearfix">
                            <div className="form-group col-md-6 col-sm-6 co-xs-12">
                              <input
                                type="text"
                                name="name"
                                required
                                placeholder="Name"
                              />
                            </div>
                            <div className="form-group col-md-6 col-sm-6 co-xs-12">
                              <input
                                type="email"
                                name="email"
                                required
                                placeholder="Email"
                              />
                            </div>
                            <div className="form-group col-md-6 col-sm-6 co-xs-12">
                              <input
                                type="text"
                                name="subject"
                                required
                                placeholder="Subject"
                              />
                            </div>
                            <div className="form-group col-md-6 col-sm-6 co-xs-12">
                              <input
                                type="text"
                                name="phone"
                                required
                                placeholder="Phone"
                              />
                            </div>
                            <div className="form-group col-md-12 col-sm-12 co-xs-12">
                              <textarea
                                name="message"
                                placeholder="Massage"
                                required
                              ></textarea>
                            </div>
                            <div className="form-group col-md-12 col-sm-12 co-xs-12">
                              <button
                                className="theme-btn btn-style-one"
                                type="submit"
                              >
                                Send Now
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="info-column col-md-4 col-sm-12 col-xs-12">
                    <div className="inner-column">
                      <h2>Contact Info</h2>
                      <ul className="list-info">
                        <li>
                          <i className="fas fa-globe"></i>Kolkata , West Bengal
                          , India.
                        </li>
                        <li>
                          <i className="far fa-envelope"></i>sunstop@ gmail.com
                        </li>
                        <li>
                          <i className="fas fa-phone"></i>+91-8240143223
                        </li>
                      </ul>
                      <ul className="social-icon-four">
                        <li className="follow">Follow on: </li>
                        <li>
                          <a href="https://www.facebook.com/official.soham.chakraborty2000/">
                            <i className="fab fa-facebook-f"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://github.com/Soham-Official">
                            <i className="fab fa-github"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.linkedin.com/in/soham-chakraborty-69aa70192/">
                            <i className="fab fa-linkedin"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.instagram.com/itssohamhere/">
                            <i
                              className="fab fa-instagram
                            "
                            ></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://soham-official.github.io/">
                            <i className="fas fa-globe"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Contact;
