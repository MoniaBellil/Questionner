import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Survey, StylesManager, Model, surveyStrings,Page, Base, PageModel, PanelModel } from "survey-react";

// Modern theme
import "survey-react/modern.min.css";
import api from "../../../axiosConfig";
import { add } from "../../../store/actions/points/points";

function DisplaySurvery() {
  const defaultThemeColors = StylesManager.ThemeColors["modern"];
  defaultThemeColors["$main-color"] = "#8468f5";
  defaultThemeColors["$main-hover-color"] = "#8468f5";
  defaultThemeColors["$text-color"] = "#33333";
  defaultThemeColors["$header-color"] = "#8468f5";

  defaultThemeColors["$header-background-color"] = "#8468f5";
  defaultThemeColors["$body-container-background-color"] = "#8468f5";

  const navigate = useNavigate();

  StylesManager.applyTheme("modern");

  const [jsons, setjsons] = useState(null);

  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      const { data } = await api.get("Surveys/confirmed");

      setjsons(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  let survey;

  const DisplaySurvery = () => {
    if (jsons !== null) {
   

      let pointsPerQuestion = []
      let  pointsCounter = 0;

 jsons[0].pages.map((pages ,i)=> pages.elements.map((points,i) => pointsPerQuestion.push(points.points) ))
  

      const survey = new Model(jsons[0]);
      const panelModel  = new PanelModel();

      surveyStrings.emptySurvey = "currently no questions available";
      survey.showPrevButton = false




  
   
    const addPoint = () => { 

    dispatch(add( pointsPerQuestion[pointsCounter++])) 
    }

    const surveyCompleted = (sender) => {
      const results = JSON.stringify(sender.data);
     
      dispatch(add( pointsPerQuestion[pointsCounter++])) ;


      console.log(results)

   
    };

    


    survey.onCurrentPageChanged.add(addPoint);
    survey.onComplete.add(surveyCompleted);
      return <Survey model={survey} />;
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 ">
          <div className="card custom-card survey-card">{DisplaySurvery()}</div>
        </div>
      </div>
    </div>
  );
}

export default DisplaySurvery;
