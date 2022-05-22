import React from "react";
import { Link } from "react-router-dom";

import './termsfaq.style.css';

const TermsFaq = () => {
  return (
    <div className="container d-flex justify-content-end term-faq">

        <Link to={"/terms-conditions"} className="me-4"> Terms and Conditions</Link>
        <Link to={"/terms-conditions"} > FAQ</Link>
  
    </div>
  );
};

export default TermsFaq;
