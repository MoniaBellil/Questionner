import React ,{ useState,useRef }from "react";
import axios from "axios"
import api from "../../../../../axiosConfig";
//custom style
import "./upload.style.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import avatar from "../../../../../assets/img/nft1.jpg";
import upload from "../../../../../assets/img/upload.png";

const UploadNft = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [displayedImg,setDisplayedImg] = useState(avatar);
  const submitForm = async (event) => {
    event.preventDefault()
    console.log("submiting ...")

    setIsUploading(true)
    await axios({
      method: "post",
      url: "https://api.nft.storage/upload",
      headers: {
        Authorization: "Bearer "+"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAxMmFkQjZEOEE4QjU3MmQ3Mzg4QjA2MzA1MjBlQTVEMTdFYjRFOEYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0OTI0Mjg2OTYyMiwibmFtZSI6Ik9yaW4ifQ.0bBt3WzDzuE_GBXd2cJ7WIJMDYYMOs2KR16s4G_RdX0",
        "Content-Type": "image/*",
      },
      data: selectedFile,
      metadata:{"name":"test"}

    }).then(async (res,err) => {
      if(err) console.log(err)
      else {
        await api.post("nfts", {"title":title,"description":description,"price":price,"cid":res.data.value.cid})
          .then(()=>{
            setIsUploading(false)
            toast.success("Media uploaded successfully", {
            theme: "colored"
          })
        })
      }
    });
  };

  const hiddenFileInput = useRef();
  return (
    <div className="container ps-0 pt-3 edit-profile-container" onSubmit={submitForm}>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}

      />
      <div className="row ps-0 justify-content-center">
        <div className="col-md-6">
          <form>
            <div className="position-relative  d-flex flex-column justify-content-center align-items-center">
              <img src={displayedImg} alt="profile" width="150px" height="150px" style={{borderRadius:"50%"}}/>
              <input
                type="file"
                className="form-control-file upload-pic-avatar"
                ref={hiddenFileInput}
                onChange={(e) => {setSelectedFile(e.target.files[0]);setDisplayedImg(URL.createObjectURL(e.target.files[0]))}}
              />
              <img className="upload-pic" src={upload} alt="profile" />
              <p className="text-center mt-3 desc-avatar ">
                Upload Nft Media
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="FullName" className="form-label">
                Title
              </label>
              <input
                value={title}
                type="text"
                className="form-control"
                id="FullName"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio" className="form-label">
                Description
              </label>
              <textarea
                value={description}
                className="form-control"
                placeholder="Description"
                id="bio"
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                value={price}
                type="text"
                className="form-control"
                id="price"
                placeholder="price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <button
              disabled={isUploading}
              type="submit"
              className="btn btn-primary primary-button mt-3 mb-5"
            >
              Upload
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default  UploadNft;
