import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Checkbox from "../../utils/Checkbox";
import SliderForm from "../../utils/SliderForm";

import "./question.css";

const Question = (props) => {
  const { question, Index, indexModal, nextQuestion } = props;
  const navigate = useNavigate();
  const handleAnswers = (e, button) => {
    nextQuestion(question.points);
    if (button === "near names") {
      navigate("/dashboard/Earn");
    }
  };



  const displayForm = () => {
    switch (question.type) {
      case "multiple choices":
        return <Checkbox question={question} handleAnswers={handleAnswers} />;
      case "slider":
        return <SliderForm question={question} />;

      default:
        return null;
    }
  };

  return (
    <Card
      border="light"
      className={`custom-card p-5 ${
        Index !== indexModal ? "d-none" : "d-block"
      } `}
    >
      <Card.Body className="question-container">
        <Card.Title className="mb-3">{question.question}</Card.Title>
        {displayForm()}
        <Card.Footer className="d-flex justify-content-center custom-footer">
          {
         question.buttons &&
          question.buttons.map((button, i) => {
            return (
              <button
                key={i}
                className="btn btn-primary primary-button me-2"
                value={button}
                onClick={(e) => {
                  handleAnswers(e, button);
                }}
              >
                {button}
              </button>
            );
          })}
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default Question;
