import React, { useState } from "react";

import UploadNft from "./components/upload/upload";

import walet from "../../../assets/img/walet.png";


const UploadNftPage = () => {
  const [key, setKey] = useState("Profile");

  return (
    <div className="container profile-container">
      
      <div className="container d-flex justify-content-end">
        <div className="position-relative bg-holder ">
          <div className="position-absolute ">
            <img src={walet} alt="bg" />
          </div>
        </div>
      </div>
      <UploadNft />
    </div>
  );
};

export default UploadNftPage;
