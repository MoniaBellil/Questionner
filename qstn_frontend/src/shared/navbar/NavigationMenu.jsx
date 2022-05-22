import { useEffect, useState } from "react";

// react bootstrap ui
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
//custom style
import "./navbar.style.css";

// images
import logo from "../../assets/img/Logo.png";

//router Links
import { Link, useLocation } from "react-router-dom";

//REDUX action
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logout ,loginNear} from "../../store/actions/auth/auth";
import { LOAD_POINTS } from "../../store/actions/points/types";

import Cookies from 'js-cookie';
const NavigationMenu = () => {
  const navigate = useNavigate();
  const signIn = (event) => {
    event.preventDefault();
    dispatch(loginNear());
  };
  const [createsurveyPage, setcreatesurveyPage] = useState(false)
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.authReducer.isAuthenticated);
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch({ type: LOAD_POINTS });
    const currentURL = window.location.href // returns the absolute URL of a page
    if(currentURL.indexOf("&")>-1 )
    {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      Cookies.set("near",params)
      console.log(user == null)
      if(Cookies.get("token") == null)
        navigate(`/Additional`);
    }
    if(window.location.href.split("/dashboard-admin")[1]) {
      setcreatesurveyPage(true);
    }else{
      setcreatesurveyPage(false);
    }
  }, [location, isLoggedIn,createsurveyPage]);

  const tutoPage = () => {
    if (!isLoggedIn) {
      return (
        <>
          <Link className="nav-link" to="/">
            Home
          </Link>
         
          <Link className="nav-link" to="/Team">
            Team
          </Link>
          <Link className="nav-link" to="/FAQ">
            FAQ
          </Link>
          <Link className="nav-link" to="/Auth/Register">
            <Button className="primary-button ">Sign Up / login</Button>
          </Link>
        </>
      );
    } else {
      return (
        <>
        
          <Link className="nav-link" to="/Dashboard/Earn">
            Lanch App
          </Link>
        
          { user !== null && user.role !== "admin" && Cookies.get("near") == null && (
            <Link className="nav-link" to="/Auth/wallet">
              <Button className="primary-button " onClick={(event) =>
                                      signIn(event)
                                    }>Connect</Button>
            </Link>
          )}
        </>
      );
    }
  };

  return (
    <Navbar bg="transparent" expand="lg" className={`py-2 main-nav pt-5 ${createsurveyPage ? 'd-none' : 'd-block'}`}>
      <Container>
        <Link className="nav-link" to="/">
          <img src={logo} alt="logo" />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-end align-items-center"
        >
          <Nav className="align-items-center">{tutoPage()}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationMenu;
