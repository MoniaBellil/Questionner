import React, { useEffect, useRef } from "react";

//custom style
import "../authStyle/auth.style.css";

//images
import rectangle from "../../../assets/img/bg.svg";
import lock from "../../../assets/img/lock.png";
import twitter from "../../../assets/img/twitter-social.svg";
import near from "../../../assets/img/Near.svg";
import google from "../../../assets/img/Google.svg";
import or from "../../../assets/img/- OR -.svg";
import Cookies from 'js-cookie';
// forms handling
import { Formik } from "formik";
import { registerSchema } from "../utils/";

// form inputs
import { TextField } from "../components/TextField";
import { Spinner } from "react-bootstrap";

//router links
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//REDUX action
import { useDispatch, useSelector } from "react-redux";
//action creator
import { register,loginGoogle ,loginNear} from "../../../store/actions/auth/auth";
//ACTION
import { REGISTER_COMPLETED } from "../../../store/actions/auth/types";

import { Toast } from "primereact/toast";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  const message = useSelector((state) => state.authReducer.message);
  const isRegistred = useSelector((state) => state.authReducer.isRegistred);

  const toast = useRef(null);
  useEffect(() => {
    showRegistrationMessage();
    return () => {
      dispatch({ type: REGISTER_COMPLETED });
    };
  }, [message, isRegistred]);


  const showRegistrationMessage = () => {

    const currentURL = window.location.href 
    if(currentURL.indexOf("&")>-1 )
{
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  Cookies.set("near",params)
  navigate(`/Additional`);
}
    else 
    if (message !== null) {
      if (isRegistred) {
        toast.current.show({
          severity: "success",
          summary: `Registration successfull`,
          detail: message,
        });

        //redirect user to login
        setTimeout(() => {
          navigate(`/Auth/Login`);
        }, 1000);
        
      } else {
        toast.current.show({
          severity: "error",
          summary: `Registration failed`,
          detail: message,
        });
      }
    }
  };

  const onRegister = (event, values) => {
    event.preventDefault();
    //get userdata
    const userData = {
      email: values.email,
      username: values.fullName,
      role: "user",
      password: values.password,
      point: 0,
    };

    dispatch(register(userData));
  };
  const onLoginGoogle = (event) => {
    event.preventDefault();

    dispatch(loginGoogle());
  };
  const signIn = (event) => {
    event.preventDefault();
    dispatch(loginNear());
  };
  return (
    <div className="background-container">
      <Toast ref={toast} />
      <div className="container auth-container">
        <div className="row justify-content-center">
          <div className="card custom-card px-0">
            <div className="card-body p-0">
              <div className="container p-0">
                <div className="row justify-content-center">
                  <div className="col-md-4 background-lock ">
                    <div className="position-relative">
                      <img src={rectangle} alt="rectangle" />
                      <img className="lock-image" src={lock} alt="lock" />
                    </div>
                  </div>
                  <div className="col-md-8 create-account flex-column align-items-center d-flex justify-content-center">
                    <div className="heading-auth d-flex flex-column align-items-center">
                      <h2 className="mb-4">Create Account </h2>
                      <div className="social-media-auth d-flex ">
                        <div>
                          <a href="">
                            <img src={twitter} alt="twitter" />
                          </a>
                        </div>
                        <div>
                          <a onClick={(event) =>
                                      onLoginGoogle(event)
                                    }>
                            <img src={google} alt="google" />
                          </a>
                        </div>
                        <div>
                          <a onClick={(event) =>
                                      signIn(event)
                                    }>
                            <img src={near} alt="near" />
                          </a>
                        </div>
                      </div>
                      <div className="or mt-3">
                        <div>
                          <img src={or} alt="or" />
                        </div>
                      </div>
                    </div>
                    <div className="auth-form-container container">
                      <div className="row justify-content-center">
                        <div className="col-8">
                          <Formik
                            initialValues={{
                              fullName: "",
                              email: "",
                              password: "",
                            }}
                            validationSchema={registerSchema}
                            onSubmit={(values, e) => {
                              console.log(values);
                            }}
                          >
                            {({ values, isValid, dirty }) => (
                              <form noValidate className="mb-4">
                                <TextField
                                  placeholder="Full name"
                                  name="fullName"
                                  type="text"
                                />

                                <TextField
                                  placeholder="Email"
                                  name="email"
                                  type="email"
                                />
                                <TextField
                                  placeholder="Password"
                                  name="password"
                                  type="password"
                                />
                                {loading ? (
                                  <button
                                    className="btn btn-primary primary-button mt-4 w-100"
                                    disabled
                                  >
                                    <Spinner
                                      as="span"
                                      animation="border"
                                      size="sm"
                                      role="status"
                                      aria-hidden="true"
                                    />
                                    <span className="visually-hidden">
                                      Loading...
                                    </span>
                                  </button>
                                ) : (
                                  <button
                                    disabled={!(isValid && dirty)}
                                    className="btn btn-primary primary-button mt-4 w-100"
                                    onClick={(event) =>
                                      onRegister(event, values)
                                    }
                                  >
                                    Create Account
                                  </button>
                                )}
                              </form>
                            )}
                          </Formik>
                          <div className="to-login-container text-center">
                            <p>
                              Already have an account?{" "}
                              <span className="primary-text ">
                                {" "}
                                <Link to={"/Auth/Login"}>Login</Link>
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
