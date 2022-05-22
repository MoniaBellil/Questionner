import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import addIcon from "../../../assets/img/add-survery.png";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../axiosConfig";
import { InputNumber } from "primereact/inputnumber";
import suveryImg from "../../../assets/img/completed-task.png";

const TableQuestions = () => {
  const [surveys, setsurveys] = useState(null);
  const [published, setpublished] = useState(null);
  const [deleted, setdeleted] = useState(null);

  const toast = useRef(null);

  const navigate = useNavigate();

  useEffect(async () => {
    const { data } = await api.get("Surveys/");
    setsurveys(data);
  }, [published, deleted]); // eslint-disable-line react-hooks/exhaustive-deps

  const confirmPublish = (event, option, id) => {
    const pulishedSurvey = {
      ...option,
      status: "published",
    };
    delete pulishedSurvey._id;
    confirmPopup({
      target: event.currentTarget,
      message: "Are you sure you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        publish(pulishedSurvey, id);
      },
      reject: cancel,
    });
  };

  const publish = async (updatedSurvey, id) => {
    try {
      const data = await api.put(`Surveys/${id}`, updatedSurvey);

      setpublished(!published);
    } catch (error) {
      console.log(error);
    }
  };

  const cancel = () => {
    toast.current.clear();
  };

  const confirmDelete = (event, id) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Do you want to delete this survey?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => Ondelete(id),
      reject: cancel,
    });
  };

  const Ondelete = async (id) => {
    try {
      const data = await api.delete(`Surveys/${id}`);

      setdeleted(!deleted);
    } catch (error) {
      console.log(error);
    }
  };

  const Onedit = (id) => {
    navigate(`/dashboard-admin/edit-survey/${id}`);
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Data Saved",
    });
  };

  const actionBodyTemplate = (option) => {
    return (
      <>
        <div>
          <Toast ref={toast}></Toast>

          <Button
            onClick={(event) => confirmPublish(event, option, option._id)}
            icon="pi pi-check"
            className="me-2 p-button-outlined"
            tooltip="Publish Questions"
            tooltipOptions={{ className: "indigo-tooltip", position: "top" }}
          ></Button>
          <Button
            onClick={() => Onedit(option._id)}
            icon="pi pi-pencil"
            className="p-button-secondary p-button-outlined me-2"
            tooltip="Edit questions"
            tooltipOptions={{ className: "bluegray-tooltip", position: "top" }}
          ></Button>
          <Button
            onClick={(event) => confirmDelete(event, option._id)}
            icon="pi pi-times"
            className="p-button-danger p-button-outlined me-2"
            tooltip="Delete questions"
            tooltipOptions={{ className: "red-tooltip", position: "top" }}
          ></Button>
        </div>
      </>
    );
  };

  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-header card-header-custom ">
          <div className="d-flex justify-content-end ">
            <Link
              className="btn btn-success d-flex success-button align-items-center"
              to={"/dashboard-admin/create-survey"}
            >
              <img src={addIcon} alt="add" className="me-2" />
              add questions
            </Link>
          </div>
        </div>
        {surveys && surveys.length === 0 ? (
          <div className="card custom-card survey-empty">
            <img src={suveryImg} className="mb-2" alt="" />
            <h5> add a Questions to continue</h5>
          </div>
        ) : (
          <DataTable value={surveys} stripedRows responsiveLayout="scroll">
            <Column field="title" header="Title"></Column>
            <Column field="description" header="description"></Column>
            <Column field="status" header="Status"></Column>

            <Column
              header="Actions"
              body={actionBodyTemplate}
              style={{
                textAlign: "center",
                justifyContent: "center",
                display: "flex",
              }}
            ></Column>
          </DataTable>
        )}
      </div>
    </div>
  );
};

export default TableQuestions;
