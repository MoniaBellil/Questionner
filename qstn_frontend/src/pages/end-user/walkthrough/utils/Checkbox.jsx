import React, { useState } from "react";


const Checkbox = ({ question }) => {
  const [checkedState, setCheckedState] = useState(
    new Array(question.reponse.length).fill(false)
  );
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(checkedState);
  };
  return (
    <form>
      {question.reponse.map((reponse, index) => (
        <div className="form-check mb-2" key={index}>
          <div role="group" aria-labelledby="checkbox-group">
            <input
              className="form-check-input"
              type="checkbox"
              value={reponse}
              name={reponse}
              id="flexCheckDefault"
              onChange={(e) => handleOnChange(index)}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              {reponse}
            </label>
          </div>
        </div>

        
      ))}

    </form>
  );
};

export default Checkbox;
