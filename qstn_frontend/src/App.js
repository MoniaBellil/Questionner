/********************************* pages  ***********************************/

// auth
import Register from "./pages/authentication/register/Register";
import Login from "./pages/authentication/login/Login";

//landing
import Landing from "./pages/landing/Landing";
import NavigationMenu from "./shared/navbar/NavigationMenu";
import Terms from "./pages/terms/Terms";

// end user components
import Dashboard from "./pages/end-user/dashboard/Dashboard";
import WalkThrough from "./pages/end-user/walkthrough/WalkThrough";
import Nft from "./pages/end-user/nft/Nft";
import Earn from "./pages/end-user/earn/Earn";
import Profile from "./pages/end-user/profile/Profile";
import UploadNftPage from "./pages/admin/upload-nft/UploadNft";

//react router
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protected/ProtectedRoute";




//admin en
import DashboardEntreprise from "./pages/admin-en/DashboardEntreprise";
import { SurveyCreatorWidget } from "./pages/admin-en/survey/SurveyCreatorWidget";
import Questions from "./pages/admin-en/questions/Questions";
import Additional from"./pages/authentication/supplementInfo/supplementInfo";
import { EditSurvey } from "./pages/admin-en/survey/EditSurvey";


const App = () => {
  return (
    <div className="position-relative">
      <NavigationMenu />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Auth/Register" element={<Register />} />
        <Route path="/Auth/Login" element={<Login />} />

        <Route path="/additional" element={<Additional />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/Dashboard" element={<Dashboard />}>
            <Route index element={<WalkThrough />} />
            <Route path="/Dashboard/Tutorial" element={<WalkThrough />} />
            <Route path="/Dashboard/Earn" index element={<Earn />} />
            <Route path="/Dashboard/Nft-store" element={<Nft />} />
            <Route path="/Dashboard/Profile" element={<Profile />} />
          </Route>
          <Route path="/Terms-conditions" element={<Terms />} />

         
        </Route>
        <Route path="/dashboard-admin" element={<DashboardEntreprise />}>
            <Route index element={<Questions />} />
            <Route path="/dashboard-admin/survey-list" element={<Questions />} />
            <Route path="/dashboard-admin/create-survey" element={<SurveyCreatorWidget/>} />
            <Route path="/dashboard-admin/edit-survey/:id" element={<EditSurvey/>} />
            <Route path="/dashboard-admin/upload-nft" element={<UploadNftPage />} />
          </Route>
      </Routes>
    </div>
  );
};

export default App;
