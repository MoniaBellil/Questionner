
import TermsFaq from "../../../../../shared/terms/TermsFaq";

//custom style
import "./editProfile.style.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from 'react';
import { generateBase64Encode } from '../../../../../utils/arraysAndFuncs';
import Cookies from 'js-cookie';
import api from "../../../../../axiosConfig";
import setAuthToken from "../../../../../utils/setAuthToken";
import { loadUser } from "../../../../../store/actions/auth/auth";
import {countries} from 'country-list-json';
const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const fileInputOnChange = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    generateBase64Encode(file, setDisplayPicture);
  };
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');
  const [displayPicture, setDisplayPicture] = useState('');
  const [fileName, setFileName] = useState('');
  const updateProfile = async (e) => {
    e.preventDefault();
    const id=user._id;;
    const contactObject = {
      id,
      name,
      phone,
      country,
      bio,
      displayPicture,
    };
    setAuthToken(Cookies.get("token"))
  try {
    const { data } = await api.post("users/updateUser",contactObject);
    dispatch(loadUser());
  } catch (err) {
    //dispatch({ type: AUTH_ERROR });
  }
  }
  const getValueName=(username)=>{
    if(name=="")
      {
        setName(username);
        return username;
      }
    return name;
  };
  const getValuePhone=(phoneUser)=>{
    if(phoneUser!="")
    {if(phone=="")
      {
        setPhone(phoneUser);
        return phoneUser;
      }
    }
    return phone;
  };
  const getValueBio=(bioUser)=>{
    if(bioUser!="")
    {if(bio=="")
      {
        setBio(bioUser);
        return bioUser;
      }
    }
    return bio;
  };
  const getValueCountry=(countryUser)=>{
    if(countryUser!="")
    {if(country=="")
      {
        setCountry(countryUser);
        return countryUser;
      }
    }
    return country;
  };
  const getValueImage=(imageUser)=>{
    if(imageUser!=null)
    {
        return imageUser;
    }
    return "/avatar.jpg";
  };
  return (
    <div className="container ps-0 pt-3 edit-profile-container">
      <div className="row ps-0">
        <div className="col-md-6 ">
          <form onSubmit={updateProfile}>
            <div className="form-group">
              <label htmlFor="FullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="FullName"
                placeholder={user.username}
                value={getValueName(user.username)}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="Country" className="form-label">
                Phone Number
              </label>
              <div className="d-flex">
                <select className="form-select max-w20" id="CountryCode">
                {countries.map((e, key) => {
                  return <option value={e.dial_code}>{e.flag}{e.dial_code}</option>;
                  })}
                </select>
                <input
                  type="text"
                  className="form-control"
                  id="number"
                  placeholder="number"
                  value={getValuePhone(user.phone)}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="Country" className="form-label">
                Country
              </label>
              <select className="form-select" id="Country"
              value={getValueCountry(user.country)}
              onChange={(e) => setCountry(e.target.value)}>
                {countries.map((e, key) => {
                  return <option value={e.name}>{e.flag}{e.name}</option>;
                  })}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="bio" className="form-label">
                Bio
              </label>
              <textarea
                className="form-control"
                placeholder="UI/UX Designer"
                id="bio"
                rows={3}
                defaultValue={""}
                value={getValueBio(user.bio)}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary primary-button mt-3"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="position-relative  d-flex flex-column justify-content-center align-items-center">
            <img src={getValueImage(user.displayPicture)} alt="profile" />
            <p className="text-center mt-3 desc-avatar">
              *Avatar should be 20*20 px.
            </p>
          <div >
          <label for='file' className="btn btn-primary primary-button mt-3"
            ref={(node) => {
              if (node) {
                node.style.setProperty("color", "#fff", "important");
              }
            }}
            style={{
              position: 'absolute', width: "60%", marginLeft: "20%", cursor: 'pointer'}}>Change avatar</label>

          <input
            type="file"
            accept="image/*"
            onChange={fileInputOnChange} style={{opacity: 0}} />
        </div> 
          </div>
          
        </div>
        
      </div>
      <TermsFaq />
    </div>
  );
};

export default EditProfile;
