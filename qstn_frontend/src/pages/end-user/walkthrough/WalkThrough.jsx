import React, { useEffect, useState } from "react";

//custom style
import "./walkthrough.style.css";

// question
import Question from "./components/Questions/Question";

import { useDispatch, useSelector } from "react-redux";
import { add } from "../../../store/actions/points/points";
import { ADD_POINT } from "../../../store/actions/points/types";
import api from "../../../axiosConfig/index";

const WalkThrough = (props) => {
  const [indexModal, setindex] = useState(0);
  const [points, setpoints] = useState({ counter: 0 });

  const [questions, setquestions] = useState(null);

  const user = useSelector((state) => state.authReducer.user);

  const dispatch = useDispatch();

  useEffect(async () => {
    const { data } = await api.get("questions/");
    setquestions(data);

    if (user !== null) {
      setpoints({ counter: user.point });
    }
  }, [user]);

  const nextQuestion = (point) => {
    // if user reach the end of the tutorial questions stop progressing
    if (indexModal < questions.length - 1) {
      setindex(indexModal + 1);
      dispatch(add(point));
    }
  };

  const onDisplayData = () => {
    if (questions ) {
      return (
        <>
          {questions.map((question, index) => (
            <Question
              key={question._id}
              question={question}
              Index={index}
              indexModal={indexModal}
              nextQuestion={nextQuestion}
            />
          ))}
        </>
      );
    }
  };

  return (
    <div className="walkthrough-container  d-flex justify-content-center align-items-center ">
      <div className="container-fluid">
        <div className="row">
          <div className="d-flex dashboard-content  justify-content-center align-items-center">
            {onDisplayData()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalkThrough;
