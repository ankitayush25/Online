import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { base_api_url } from "../config";
// const base_api_url = "https://aryaa-cbt-backend.onrender.com";

class ExamSummary extends Component {
  state = {
    result: null,
  };

  componentDidMount = () => {
    axios.get(`${base_api_url}/api/getScore/`).then((res) => {
      console.log(res.data);
      this.setState({ result: res.data });
    });
  };

  getCount = (sec) => {
    const ques = this.props.Questions;
    let num_of_ans, num_of_visit, num_of_review;
    num_of_ans = num_of_visit = num_of_review = 0;
    ques[sec].forEach((question) => {
      if (question.isAnswered) {
        num_of_ans++;
      }
      if (question.isReviewed) {
        num_of_review++;
      }
      if (question.isVisited) {
        num_of_visit++;
      }
    });
    return { num_of_ans, num_of_visit, num_of_review };
  };

  render() {
    return (
      <div className="h-100">
        <nav
          className="navbar 
           py-0 px-3 text-white"
          style={{ background: "#29385c" }}
        >
          NIMCET - 2021
        </nav>
        <div
          className="d-flex flex-column align-items-center px-5 "
          style={{ height: "40vw" }}
        >
          <div className="h-25 d-flex align-items-end fs-3 py-3">
            Exam Summary
          </div>
          <table className="table h-25 table-bordered">
            <thead>
              <tr>
                <th scope="col">Section name</th>
                <th scope="col">No. of Question</th>
                <th scope="col">Answered</th>
                <th scope="col">Not answered</th>
                <th scope="col">Marked for review</th>
                <th scope="col">Not visited</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(this.props.Questions).map((key) => (
                <tr>
                  <th scope="row" className="text-capitalize">
                    {key}
                    {/* {() => this.getCount(key)} */}
                  </th>
                  <td>{this.props.Questions[key].length}</td>
                  <td>{this.getCount(key).num_of_ans}</td>
                  <td>
                    {this.props.Questions[key].length -
                      this.getCount(key).num_of_ans}
                  </td>
                  <td>{this.getCount(key).num_of_review}</td>
                  <td>
                    {this.props.Questions[key].length -
                      this.getCount(key).num_of_visit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="fs-4">
            Your test is submitted successfully! Proceed further.
          </div>
          <div className="m-2">
            <Link
              to={{
                pathname: "/score-screen",
              }}
            >
              <button type="button" className="btn btn-primary me-2">
                Proceed
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Questions: state.index.questions,
    // answers: state.index.answers,
    // QuesPprID: state.index.paperID,
  };
};

export default connect(mapStateToProps)(ExamSummary);
