import React from "react";

//react bootstrap
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Terms.styles.css";

const Terms = () => {
  return (
    <div className="background-container">
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 terms-container">
            <div className="title-terms mb-5 text-center">
              <h2>Terms and Conditions </h2>
            </div>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Terms and Conditions </Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Privacy Policy</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          <div className="container mt-5 justify-content-end d-flex">
            <Link className="btn btn-primary primary-button" to={"/Dashboard"}>Agree</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
