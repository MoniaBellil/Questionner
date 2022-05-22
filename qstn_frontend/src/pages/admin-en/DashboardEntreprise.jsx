
import React from "react";
import { Outlet } from "react-router-dom";
import SidenavAdmin from "./sidenav/SidenavAdmin";



const DashboardEntreprise = () => {
  return (
    <div className="background-container">
      <div className="container-fluid">
        <div className="row">
          <SidenavAdmin />
          <div className="dashboard-en-content ">
          <Outlet/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEntreprise;
