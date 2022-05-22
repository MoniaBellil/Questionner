import React, { useEffect, useState } from "react";
import { Nav, Spinner } from "react-bootstrap";

import { Link, useLocation, useNavigate } from "react-router-dom";
import upload from "../../../assets/img/upload-arrow.png";
//custom style
import "./sideNav.style.css";

//image
import avatar from "../../../assets/img/avatar-admin.svg";
import question from "../../../assets/img/question.svg";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/actions/auth/auth";

const SidenavAdmin = () => {
  const [isTutorialPage, setisTutorialPage] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.authReducer.user);
  const points = useSelector((state) => state.pointsReducer.currentPoints);

  useEffect(() => {}, []);

  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="sidenav-dash p-0">
      <div className="d-flex flex-column justify-content-center align-items-center align-items-sm-start text-white min-vh-100 p-5">
        {user === null ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="visually-hidden">Loading...</span>
          </>
        ) : (
          <>
            <div className="d-flex flex-column w-100 align-items-center ">
              <img className="avatar" src={avatar} alt="avatar" />

              <Link
                className="balance d-flex justify-content-center align-items-center flex-column mt-2 nav-link"
                to={"/dashboard-admin"}
              >
                <p className="mb-0">{user.username}</p> <b />
              </Link>
            </div>
          </>
        )}

        <Link to={"/Dashboard-admin/survey-list"} className="nav-link">
          <img src={question} alt="dollar" />
          Questions
        </Link>
        <Link to={"/dashboard-admin/upload-nft"} className="nav-link">
          <img src={upload} alt="dollar" width="20px" height="25px" /> Upload Nft Media
        </Link>

        <Nav.Link onClick={() => onLogout()}>Logout</Nav.Link>
      </div>
    </div>
  );
};

export default SidenavAdmin;
