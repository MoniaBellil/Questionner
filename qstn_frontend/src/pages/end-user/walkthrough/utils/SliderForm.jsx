import React, { useState } from "react";
import { Slider } from "primereact/slider";

const SliderForm = ({ question }) => {
  const [Range, setRange] = useState([0, 10]);


  return (
    <>
      <div className="d-flex justify-content-between align-items-center range-container">
        <label htmlFor="range" className="me-3">
          {question.reponse[0]}
        </label>

        <Slider
          min={0}
          max={10}
          value={Range}
          onChange={(e) => setRange(e.value)}
          id="range"
          className="w-100"
        />

        <label htmlFor="range" className="ms-3">
          {question.reponse[1]}
        </label>
      </div>
    </>
  );
};

export default SliderForm;
