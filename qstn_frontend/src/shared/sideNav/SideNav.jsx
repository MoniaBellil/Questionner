import React, { useEffect, useState } from "react";
import { Nav, Spinner } from "react-bootstrap";

import { Link, useLocation, useNavigate } from "react-router-dom";

//custom style
import "./sideNav.style.css";

//image

import dollar from "../../assets/img/dollar.svg";
import nft from "../../assets/img/nft.svg";
import carbon_badge from "../../assets/img/carbon_badge.svg";
import profile from "../../assets/img/profile.svg";
import store from "../../assets/img/store.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/auth/auth";

const SideNav = () => {
  const getAavatar=(imageUser)=>{
    if(imageUser!=null)
    {
        return imageUser;
    }
    return "/avatar.jpg";
  };
  const [isTutorialPage, setisTutorialPage] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.authReducer.user);
  const points = useSelector((state) => state.pointsReducer.currentPoints);
  useEffect(() => {
    if (window.location.href.split("/Dashboard")[1] === "") {
      setisTutorialPage(true);
    } else {
      setisTutorialPage(false);
    }
  
  }, [isTutorialPage, location, user, points]);

  const onLogout = () => {
    dispatch(logout());
    navigate('/')
  };

  const tutoPage = () => {
    if (!isTutorialPage) {
      return (
        <>
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
              <Nav.Link
                href="#home"
                className="d-flex flex-column w-100 align-items-center"
              >
                <img className="avatar" src={getAavatar(user.displayPicture)} alt="avatar" />

                <div className="balance d-flex justify-content-center align-items-center flex-column mt-2">
                  <p className="mb-0">{user.username}</p> <b />
                  <div>
                    Balance : <span>{points}</span>
                  </div>
                </div>
              </Nav.Link>
              <Link to={"/Dashboard/Earn"} className="nav-link">
                <img src={dollar} alt="dollar" /> Earn
              </Link>
              <Link to={"/Dashboard/Nft-store"} className="nav-link">
                <img src={nft} alt="nft" />
                NFT
              </Link>
              <Link to={"/Dashboard/Profile"} className="nav-link">
                <img src={profile} alt="profile" />
                Profile
              </Link>
              <Nav.Link href="#Refferrals">
                <img src={carbon_badge} alt="carbon_badge" />
                Refferrals
              </Nav.Link>

              <Nav.Link href="#Store">
                <img src={store} alt="store" />
                NFT Store
              </Nav.Link>
              <Nav.Link onClick={() => onLogout()}>Logout</Nav.Link>
            </>
          )}
        </>
      );
    } else {
      return (
        <>
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
            <Nav.Link
              href="#home"
              className="d-flex flex-column w-100 align-items-center"
            >
              <img className="avatar" src={getAavatar(user.displayPicture)} alt="avatar" />

              <div className="balance d-flex justify-content-center align-items-center flex-column mt-2">
                <p className="mb-0">{user.username}</p> <b />
                <div>
                  Balance : <span>{points}</span>
                </div>
              </div>
            </Nav.Link>
          )}
        </>
      );
    }
  };

  return (
    <div className="sidenav-dash p-0">
      <div className="d-flex flex-column justify-content-center align-items-center align-items-sm-start text-white min-vh-100 p-5">
        {tutoPage()}
      </div>
    </div>
  );
};

export default SideNav;
