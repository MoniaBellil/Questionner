import { Component, Fragment } from "react";
import { Button } from "react-bootstrap";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import { Serializer } from "survey-react";

import "./surveryCreator.style.css";

import api from "../../../axiosConfig";

export function EditSurvey() {
  const creatorOptions = {
    showLogicTab: false,
    showEmbeddedSurveyTab: false,
    toolbar: false,
    showJSONEditorTab: false,
    haveCommercialLicense: true,
  };

  Serializer.getProperty("boolean", "title").visible = false;

  const creator = new SurveyCreator(creatorOptions);
  creator.text = window.localStorage.getItem("survey-json");

  creator.saveSurveyFunc = (saveNo, callback) => {
    window.localStorage.setItem("survey-json", creator.text);
    console.log("ok");
    callback(saveNo, true);
    // saveSurveyJson(
    //     "https://your-web-service.com/",
    //     creator.JSON,
    //     saveNo,
    //     callback
    // );

    const createdSurvey = {
      ...creator.JSON,
      status: "created",
    };
    saveSurvey(createdSurvey);
  };

  const saveSurvey = async (survey) => {
    try {
      const { data } = await api.post("Surveys/", survey);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="position-relative">
      <SurveyCreatorComponent creator={creator} />
    </div>
  );
}
