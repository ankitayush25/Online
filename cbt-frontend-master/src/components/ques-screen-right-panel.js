import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import { useHistory } from "react-router-dom";
import { base_api_url } from "../config";
// const base_api_url = "https://aryaa-cbt-backend.onrender.com";

const QuesScreenRightPanel = (props) => {
  // const [score, setScore] = useState(0);
  const history = useHistory();

  const calulateScore = async () => {
    await axios
      .post(
        `${base_api_url}/api/calculateScore/`,
        {
          id: props.QuesPprID,
          ans: props.answers,
          user_id: JSON.parse(localStorage.getItem("login")).user_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("login")).token,
          },
          // headers: {
          //   Authorization:
          //     "Bearer " + JSON.parse(localStorage.getItem("login")).token,
          // },
        }
      )
      .then((response) => {
        console.log("r======", response.data);
        // setScore(response.data.total_score);
      })
      .catch((err) => console.log("r=========", err));

    history.replace("/examsummary");

    // await axios
    //   .post(
    //     `http://localhost:8080/api/storeMarks/${
    //       JSON.parse(localStorage.getItem("login")).user_id
    //     }`,
    //     { qp_id: props.QuesPprID, score: score }
    //   )
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    // <div className="container">
    <div className="col-3">
      {/* <div className="row mx-0 text-primary">
        <div className="col ps-3">
          <u>Question paper</u>
        </div>
        <div className="col">
          <u>Instruction</u>
        </div>
      </div> */}
      <hr className="m-0" />
      <div className=" d-flex ">
        <img
          src={"https://picsum.photos/id/20/100/100"}
          className="col"
          alt="img"
          height="100"
        />

        <div className="mx-2">
          {/* <div className="row px-2 text-capitalize"> */}
          Name : {JSON.parse(localStorage.getItem("login")).username}
          {/* </div> */}
          {/* <div className="row px-2">Roll no.: 20218833</div> */}
        </div>
      </div>
      <hr className="m-0" />

      <div className="container" style={{ fontSize: "13px" }}>
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col-3">
                <i className="fa fa-circle fs-4" style={{ color: "green" }} />
              </div>
              <div className="col">Answered</div>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <div className="col-3">
                <i className="fa fa-circle fs-4" style={{ color: "red" }} />
              </div>
              <div className="col">Not answered</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col-3">
                <i className="fa fa-circle fs-4" style={{ color: "#ffc107" }} />
              </div>
              <div className="col">Marked for review</div>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <div className="col-3">
                <i className="fa fa-circle fs-4" style={{ color: "gray" }} />
              </div>
              <div className="col">Not visit</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col-2">
                <i className="fa fa-circle fs-4" style={{ color: "#0dcaf0" }} />
              </div>
              <div className="col ps-0">Answered & marked for review</div>
            </div>
          </div>
        </div>
      </div>

      <hr className="m-0" />
      <div
        className=" px-3 fs-5 text-white text-capitalize"
        style={{ backgroundColor: "#29385c" }}
      >
        {props.currentSection}
      </div>
      <hr className="m-0" />
      <div
        className="container border h-50"
        style={{ background: "#63e7f23d" }}
      >
        <div className="row">
          {props.questions
            ? props.questions[props.currentSection].map((ques, idx) => (
                <div
                  role="button"
                  className={`col-2 border bg-secondary  text-white px-0 py-1 m-1 d-flex justify-content-center align-items-center 
                    ${
                      props.questions[props.currentSection][idx].isAnswered &&
                      props.questions[props.currentSection][idx].isReviewed
                        ? "bg-info"
                        : props.questions[props.currentSection][idx].isAnswered
                        ? "bg-success"
                        : props.questions[props.currentSection][idx].isReviewed
                        ? "bg-warning"
                        : props.questions[props.currentSection][idx].isVisited
                        ? "bg-danger"
                        : null
                    }

                      `}
                  key={idx}
                  onClick={() => props.onChangeQues(idx)}
                >
                  {idx + 1}
                </div>
              ))
            : null}
        </div>
      </div>
      <div
        className="d-flex"
        // style={{ height: "100%" }}
      >
        <button
          type="button"
          className="btn btn-success mx-auto my-5 w-50"
          onClick={calulateScore}
        >
          Submit
        </button>
      </div>
    </div>
    // </div>
  );
};

const mapStateToProps = (state) => {
  return {
    // PaperTypeID: state.index.paperTypeID,
    // PaperID: state.index.paperID,
    // Questions: state.index.questions,
    answers: state.index.answers,
    QuesPprID: state.index.paperID,
  };
};

export default connect(mapStateToProps)(QuesScreenRightPanel);
