import React, { useState,useEffect } from "react";
import axios from "axios";


import './nft.style.css';


const Nft =() => {
  const [nfts,setNfts] = useState([])
  const getNfts = async () => {
    await axios({
      method: "get",
      url: "http://localhost:3000/nfts",
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI0ZjFkYzI0M2U5ODMxNzQwM2JmY2I3Iiwicm9sZSI6ImFkbWluIiwidXNlcm5hbWUiOiJvbWFyNCIsImVtYWlsIjoib21hckBtYWlsLmNvbSIsImlhdCI6MTY0OTQyMjY1MCwiZXhwIjoxNjUwMDI3NDUwfQ.-xkmFwK5SQEGFwl8yk2vpSKxUDY3cefatz2TC1T5Bjo",
      }
    }).then(res=>{setNfts(res.data)});

  }

  useEffect (()=> {
       
    getNfts();
   }, []);
  

   const mint_nft = ()=>{
    
   }


  return (
    <div className="container nft-container mt-5">
      <div className="row">
          {nfts.map((nft,ind)=>{return (
            <div key={ind} className="col-md-6 col-lg-4">
              <div className="card mb-2">
                <img className="card-img-top" src={"https://"+nft.cid+".ipfs.nftstorage.link"} />
                <div className="card-body">
                  <h4 className="card-title">{nft.title}</h4>
                  <p className="card-text">
                    {nft.description}
                  </p>
                  <a className="btn btn-primary primary-button" onClick={mint_nft}>Buy for {nft.price}</a>
                </div>
              </div>
            </div>)
      })}
      </div>
    </div>
  );
};

export default Nft;
