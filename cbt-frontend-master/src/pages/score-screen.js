import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

import { connect } from "react-redux";
import axios from "axios";

import NavBar from "../components/navbar";
import { base_api_url } from "../config";
// const base_api_url = "https://aryaa-cbt-backend.onrender.com";

const ScoreScreen = (props) => {
  const [paperDetail, setPaperDetail] = useState({});
  const [result, setResult] = useState({});
  const [pieData, setPieData] = useState([]);

  const data = {
    labels: ["Wrong", "Correct", "Unattempt"],
    datasets: [
      {
        label: "# of Votes",
        // data: [10, 40, 40],
        data: pieData,
        backgroundColor: [
          "rgba(247, 0, 0, 0.6)",
          "rgba(26, 165, 46, 0.6)",
          "rgba(247, 229, 0, 0.6)",
        ],
        borderColor: [
          "rgba(247, 0, 0, 1)",
          "rgba(26, 165, 46, 1)",
          "rgba(247, 229, 0, 1)",
        ],
        borderWidth: 1.5,
        cutout: 100,
      },
    ],
  };

  console.log(props);

  const getScore = async () => {
    await axios
      .get(`${base_api_url}/api/getScore/`)
      .then((response) => {
        console.log("calfn======", response);
        const result = response.data;
        setResult(response.data);
        const correct = result.total_score;
        const wrong = result.total_attempt - result.total_score;
        const unattempt = result.total_ques - result.total_attempt;

        const data = [wrong, correct, unattempt];
        console.log("pie data", data);
        setPieData(data);
      })
      .catch((err) => console.log("calfn=========", err));
  };

  useEffect(() => {
    console.log("mount===========");

    getScore();

    console.log(pieData);

    console.log(props);
    console.log(props.PaperTypeID);
    axios
      .get(`${base_api_url}/api/getQuesPaperDetail/${props.PaperTypeID}`, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("login")).token,
        },
      })
      .then((res) => {
        console.log(res.data[0]);
        setPaperDetail(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <NavBar />
      <nav
        className="navbar navbar-dark flex-nowrap "
        // style={{ text: "#29385c" }}
      >
        <div className="container-fluid">
          <div className="d-flex ">
            <a
              className="navbar-brand"
              href="/"
              style={{ color: "black", fontWeight: 500, fontSize: "1.5rem" }}
            >
              Your Score
            </a>
          </div>
        </div>
        {/* <div className="container-fluid justify-content-end">
          <button type="button" class="btn btn-info text-white ">
            <i className="fa fa-file pe-2"></i>
            Answer Key
          </button>
        </div> */}
      </nav>
      <div className="d-flex flex-column w-50 text-center border mt-4 mx-auto shadow ">
        <h2 className="border-bottom py-2">Overview</h2>
        <div className="pb-4">
          <Doughnut
            data={data}
            height={300}
            width={300}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>
      <div className="row m-5">
        <div className="col mb-4">
          <div className="border-3 border-start border-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1 ">
                    Score
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    <span>{result.total_score}</span>
                    <span> / </span>
                    <span className="ng-binding">
                      {/* {paperDetail.total_marks} */}
                      {result.total_ques}
                    </span>
                  </div>
                </div>
                <div className="col-auto">
                  <i
                    className="fa fa-clipboard text-gray-300"
                    style={{ color: "#cfd1d3", fontSize: "24px" }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col mb-4">
          <div className="border-3 border-start border-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1 ">
                    Accuracy
                  </div>
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                        <span>{result.accuracy}</span>%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <i
                    className="fa fa-bullseye text-gray-300"
                    style={{ color: "#cfd1d3", fontSize: "24px" }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col mb-4">
          <div className="border-3 border-start border-danger shadow h-100 py-2">
            <div className="card-body ">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-danger text-uppercase mb-1 ">
                    Percentage
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    <span>{result.percentage}</span>%
                  </div>
                </div>
                <div className="col-auto">
                  <i
                    className="fa fa-percent"
                    style={{ color: "#cfd1d3", fontSize: "24px" }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card m-5 shadow">
        <div className="card-header">Attempted Efficiency</div>
        <div className="card-body">
          <div class="row">
            <div class="col mb-4 px-4">
              <div class="card h-100 py-2 border-0 shadow">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-info font-weight-light text-uppercase mb-1">
                        Attempted
                      </div>
                      <div class="h5 mb-0 font-weight-lightbold text-gray-700">
                        <span>{result.total_attempt}</span> <span>of</span>{" "}
                        <span>{result.total_ques}</span>
                      </div>
                    </div>
                    <div class="col-auto">
                      <div class="text-info">
                        <span class="fa-stack fa-2x">
                          <i
                            class="fa fa-circle fa-stack-2x"
                            style={{ opacity: "0.2" }}
                          ></i>

                          <i class="fa fa-pencil fa-stack-1x "></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col mb-4 px-4">
              <div class="card h-100 py-2 border-0 shadow">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-success font-weight-light text-uppercase mb-1 ">
                        Correct
                      </div>

                      <div class="h5 mb-0 font-weight-lightbold text-gray-700">
                        <span>{result.total_score}</span> <span>of</span>{" "}
                        <span>{result.total_attempt}</span>
                      </div>
                    </div>
                    <div class="col-auto">
                      <div class="text-success">
                        <span class="fa-stack fa-2x">
                          <i
                            class="fa fa-circle fa-stack-2x"
                            style={{ opacity: "0.2" }}
                          ></i>
                          <i class="fa fa-check fa-stack-1x "></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col mb-4 px-4">
              <div class="card h-100 py-2 border-0 shadow">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-danger font-weight-light text-uppercase mb-1 ">
                        Incorrect
                      </div>
                      <div class="h5 mb-0 font-weight-lightbold text-gray-700">
                        <span>{result.total_attempt - result.total_score}</span>{" "}
                        <span>of</span> <span>{result.total_attempt}</span>
                      </div>
                    </div>
                    <div class="col-auto">
                      <div class="text-danger">
                        <span class="fa-stack fa-2x">
                          <i
                            class="fa fa-circle fa-stack-2x"
                            style={{ opacity: "0.2" }}
                          ></i>
                          <i class="fa fa-times fa-stack-1x"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3">
            Your detailed section performance is shown below
          </div>
          <div class="col-xs-12">
            <table class="table table-bordered table-grid section-table customScrollBar">
              <thead>
                <tr>
                  <th scope="col">Section</th>
                  <th scope="col">Attempted</th>
                  <th scope="col">Correct</th>
                  <th scope="col">Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(props.Questions).map((key, idx) => (
                  <tr>
                    <th scope="row" className="text-capitalize">
                      {key}
                    </th>

                    <td>
                      <div>
                        <span>
                          {result.sec_wise_attempt
                            ? result.sec_wise_attempt[idx][key]
                            : -1}
                        </span>
                        <span> / </span>
                        <span>{props.Questions[key].length}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <span>
                          {result.sec_wise_score
                            ? result.sec_wise_score[idx][key]
                            : -1}
                        </span>
                        <span> / </span>
                        <span>
                          {result.sec_wise_attempt
                            ? result.sec_wise_attempt[idx][key]
                            : -1}
                        </span>
                      </div>
                    </td>
                    <td>
                      {((result.sec_wise_score
                        ? result.sec_wise_score[idx][key]
                        : -1) /
                        (result.sec_wise_attempt
                          ? result.sec_wise_attempt[idx][key]
                            ? result.sec_wise_attempt[idx][key]
                            : 1
                          : 1)) *
                        100}
                      %
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    PaperTypeID: state.index.paperTypeID,
    PaperID: state.index.paperID,
    Questions: state.index.questions,
    answers: state.index.answers,
    QuesPprID: state.index.paperID,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // SetScore: (score) => dispatch(SetScore(score)),
//   };
// };

export default connect(mapStateToProps)(ScoreScreen);
