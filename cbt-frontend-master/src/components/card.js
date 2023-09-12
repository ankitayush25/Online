import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { useHistory } from "react-router-dom";

import {
  // SetQuestionPaper,
  // UpdateCurrentSection,
  SetQuestionPaperID,
  SetPaperTypeID,
} from "../redux/question/question.actions";

import { base_api_url } from "../config";
import Loader from "./loader";

// const base_api_url = "https://aryaa-cbt-backend.onrender.com";

const Card = (props) => {
  const history = useHistory();

  const [allQuestionPapers, setAllQuestionPaper] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [currentSection, setCurrentSection] = useState(null);

  useEffect(() => {
    axios
      .get(`${base_api_url}/api/getAllPaper`)
      // .get("http://localhost:8080/api/getAllPaper")

      .then((res) => {
        console.log(res.data);
        setAllQuestionPaper(res.data.rows);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        alert("Somthing went wrong !!!");
      });
  }, []);

  const OnStartTest = (id, pid) => {
    console.log(id, pid);

    props.SetQuestionPaperID(id);
    props.SetPaperTypeID(pid);
    if (localStorage.getItem("login")) {
      history.push("/instruction");
      console.log("props ", props);
    } else {
      console.log("history", history);
      history.push("/auth/login");
    }
  };

  // const getAllquestionsCurrentPaper = (id, pid) => {
  //   props.SetQuestionPaperID(id);
  //   props.SetPaperTypeID(pid);
  //   console.log("question paper id type id", id, pid);
  //   axios
  //     .get(`http://localhost:8080/api/getPaper/${id}`)
  //     .then((res) => {
  //       // console.log(res.data);
  //       console.log(props);
  //       props.UpdateCurrentSection(Object.keys(res.data)[0]);
  //       props.SetQuestionPaper(res.data);
  //       // props.InitialSetAnswer();
  //       // console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   console.log("im getallquesfunction");
  //   console.log(props.questions);
  // };

  // const getSection = (id) => {
  //   axios
  //     .get(`http://localhost:8080/api/getSections/${id}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       props.SetQuestionPaper(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        allQuestionPapers.map((ppr, idx) => (
          <div
            key={idx}
            className="card w-75 mx-auto my-5 text-start shadow bg-white rounded"
          >
            <h5
              className="card-header text-white"
              style={{ background: "#8a8b8c" }}
            >
              {ppr.paper_name} - {ppr.year}
            </h5>
            <div className="card-body">
              {/* <h5 className="card-title">Your score : {ppr.total_marks}</h5> */}
              <div className="card-text w-50 d-flex justify-content-between">
                <div>Questions : {ppr.total_ques}</div>
                <div>Marks : {ppr.total_marks}</div>
                <div>Time : {ppr.total_time} mintues</div>
              </div>
              {/* <Link
                  to="/instruction"
                  onClick={
                    () => OnStartTest(ppr.qp_id, ppr.ppr_id)
                    // getAllquestionsCurrentPaper(ppr.qp_id, ppr.ppr_id)
                  }
                >
                  <div className="btn btn-primary mt-3">Start Test</div>
                </Link> */}

              <div
                className="btn btn-primary mt-3"
                onClick={() => OnStartTest(ppr.qp_id, ppr.ppr_id)}
              >
                Start Test
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     questions: state.index.questions,
//   };
// };

const mapDispatchToprops = (dispatch) => {
  return {
    // SetQuestionPaper: (ppr) => dispatch(SetQuestionPaper(ppr)),
    // UpdateCurrentSection: (sec) => dispatch(UpdateCurrentSection(sec)),
    SetQuestionPaperID: (id) => dispatch(SetQuestionPaperID(id)),
    SetPaperTypeID: (pid) => dispatch(SetPaperTypeID(pid)),
  };
};

export default connect(null, mapDispatchToprops)(Card);
