import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import "./surveryCreator.style.css";
import api from "../../../axiosConfig";
import { useEffect, useRef, useState } from "react";

import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";

import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

import { Serializer } from "survey-core";

export function SurveyCreatorWidget() {
  const toast = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {}, []);

  const creatorOptions = {
    showLogicTab: false,
    showEmbeddedSurveyTab: false,
    toolbar: false,
    showJSONEditorTab: false,
    haveCommercialLicense: true,
  };

  //Add new property
  Serializer.addProperty("question", {
    name: "points:number",
    category: "general",
  });

  const creator = new SurveyCreator(creatorOptions);

  //Set the property value on creating a new question in the creator
  creator.onQuestionAdded.add(function (sender, options) {
    options.question.points = 1;
  });

  Serializer.findProperty("survey", "locale").visible = false;
  Serializer.findProperty("question", "title").visible = false;
  Serializer.findProperty("question", "visible").visible = false;
  Serializer.findProperty("question", "readOnly").visible = false;

  creator.text = window.localStorage.getItem("survey-json");

  creator.saveSurveyFunc = (saveNo, callback) => {
    window.localStorage.setItem("survey-json", creator.text);
    callback(saveNo, true);
    const createdSurvey = {
      ...creator.JSON,
      status: "created",
    };

    saveSurvey(createdSurvey);
  };

  const saveSurvey = async (survey) => {
    try {
      const data = await api.post("Surveys/", survey);

      if (data.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Survey created successfuly",
        });

        setTimeout(() => {
          navigate("/dashboard-admin/");
        }, 1000);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="position-relative">
      <Toast ref={toast}></Toast>

      <SurveyCreatorComponent creator={creator} />
    </div>
  );
}
