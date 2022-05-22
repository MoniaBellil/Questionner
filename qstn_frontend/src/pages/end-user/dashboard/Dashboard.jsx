import React from "react";
import { Outlet } from "react-router-dom";

//side nav
import SideNav from "../../../shared/sideNav/SideNav";




const Dashboard = () => {
  return (

    <div className="background-container">
      <div className="container-fluid">
        <div className="row">
          <SideNav/>
          <div className="dashboard-content">
          <Outlet/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
