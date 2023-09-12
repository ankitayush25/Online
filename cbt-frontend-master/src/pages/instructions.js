import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";

class Instructions extends Component {
  state = {
    checked: false,
    checkBoxError: false,
  };

  handleBeforeUnload = (e) => {
    e.preventDefault();
    const message =
      "Are you sure you want to leave? All provided data will be lost.";
    e.returnValue = message;
    return message;
  };

  componentDidMount = () => {
    console.log("component did mount ques screen", this.props.questions);

    window.addEventListener("beforeunload", this.handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", this.handleBeforeUnload);
    };
  };

  onSubmitHandler = (e) => {
    e.preventDefault();

    const { checked } = this.state;
    let error = false;
    if (checked === false) {
      this.setState({ checkBoxError: true });
      error = true;
    }

    if (checked === true) {
      this.props.history.push(`/questionscreen/${this.props.quesPprID}`);
    }

    if (error) {
      return;
    }
  };

  handleChange = (e) => {
    this.setState({ checked: e.target.checked });

    if (e.target.checked) {
      this.setState({ checkBoxError: false });
    }
  };

  render() {
    return (
      <Fragment>
        <nav className="navbar bg-info ">
          <div className="container-fluid text-light fw-bold">INSTRUCTIONS</div>
        </nav>
        <div className="ibpsInstructions py-3">
          <div className="english_Instructions">
            <p className=" px-3">
              <b>Please read the instructions carefully</b>
            </p>
            <h3 className="text-start px-3 fs-5">A) General Instructions</h3>
            <ol className="instructionOl text-start">
              <li>
                The clock has been set at the server and the countdown timer at
                the top right corner of your screen will display the time
                remaining for you to complete the exam. When the clock runs out
                the exam ends by default - you are not required to end or submit
                your exam.{" "}
              </li>
              <li>
                The question palette at the right of screen shows one of the
                following statuses of each of the questions numbered:
                <div id="QuestionIndicatorIns">
                  <div>
                    <div className="missedIcon">1</div>
                    <div>You have not visited the question yet.</div>
                  </div>
                  <div>
                    <div className="skippedIcon">2</div>
                    <div>You have not answered the question.</div>
                  </div>
                  <div>
                    <div className="attemptedIcon">3</div>
                    <div>You have answered the question.</div>
                  </div>
                  <div>
                    <div className="reviewIcon">4</div>
                    <div>
                      You have NOT answered the question but have marked the
                      question for review.
                    </div>
                  </div>
                  <div>
                    <div className="review_answeredIcon">5</div>
                    <div>
                      You have answered the question but marked it for review.
                    </div>
                  </div>
                </div>
              </li>
              <li className="noListStyle">
                The Marked for Review status simply acts as a reminder that you
                have set to look at the question again.
                <span className="Red">
                  If an answer is selected for a question that is Marked for
                  Review, the answer will be considered in the final evaluation.
                </span>
              </li>
            </ol>
            <h3 className="text-start px-3 fs-5">
              B) Navigating to a question:
            </h3>
            <ol className="instructionOl text-start">
              <li>
                For multiple choice type question:
                <ol>
                  <li>
                    Click on the question number on the question palette at the
                    right of your screen to go to that numbered question
                    directly. Note that using this option does NOT save your
                    answer to the current question.{" "}
                  </li>
                  <li>
                    Click on Save and Next to save answer to current question
                    and to go to the next question in sequence.
                  </li>
                  <li>
                    Click on Mark for Review and Next to save answer to current
                    question, mark it for review, and to go to the next question
                    in sequence.
                  </li>
                </ol>
              </li>
              <li>
                You can view the entire paper by clicking on the{" "}
                <b>Question Paper</b> button.
              </li>
            </ol>
            <h3 className="text-start mx-3 fs-5">C) Answering questions:</h3>
            <ol className="instructionOl text-start">
              <li>
                For multiple choice type question:
                <ol>
                  <li>
                    To select your answer, click on one of the option buttons
                  </li>
                  <li>
                    To change your answer, click the another desired option
                    button
                  </li>
                  <li>
                    To save your answer, you MUST click on{" "}
                    <b>Save &amp; Next</b>{" "}
                  </li>
                  <li>
                    To deselect a chosen answer, click on the chosen option
                    again or click on the <b>Clear Response</b> button.
                  </li>
                  <li>
                    To mark a question for review click on{" "}
                    <b>Mark for Review &amp; Next</b>.{" "}
                    <span className="Red">
                      If an answer is selected for a question that is Marked for
                      Review, the answer will be considered in the final
                      evaluation.
                    </span>
                  </li>
                </ol>
              </li>
              <li>
                To change an answer to a question, first select the question and
                then click on the new answer option followed by a click on the{" "}
                <b>Save &amp; Next</b> button.
              </li>
              <li>
                Questions that are saved or marked for review after answering
                will ONLY be considered for evaluation.
              </li>
            </ol>
            <h3 className="text-start mx-3 fs-5">
              D) Navigating through sections:
            </h3>
            <ol className="instructionOl text-start mb-0">
              <li>
                Sections in this question paper are displayed on the top bar of
                the screen. Questions in a section can be viewed by clicking on
                the section name. The section you are currently viewing is
                highlighted.
              </li>
              <li>
                After clicking the <b>Save &amp; Next</b> button on the last
                question for a section, you will automatically be taken to the
                first question of the next section.{" "}
              </li>
              <li>
                You can move the mouse cursor over the section names to view the
                status of the questions for that section.{" "}
              </li>
              <li>
                You can shuffle between sections and questions anytime during
                the examination as per your convenience.{" "}
              </li>
            </ol>
          </div>
        </div>
        <div class=" ms-3 form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="exampleCheck1"
            onChange={(e) => this.handleChange(e)}
          />
          <label class="form-check-label" for="exampleCheck1">
            I have read and understood the instructions. All Computer Hardwares
            allotted to me are in proper working condition. I agree that I am
            not carrying any prohibited gadget like mobile phone etc. / any
            prohibited material with me into the exam hall. I agree that in case
            of not adhering to the instructions, I will be disqualified from
            taking the exam.
          </label>
        </div>
        {this.state.checkBoxError ? (
          <div className="text-danger ps-3">
            {/* {" "} */}
            *You must agree before go ahead.
          </div>
        ) : null}

        <button
          type="submit"
          onClick={this.onSubmitHandler}
          className="btn btn-primary my-4 mx-3"
        >
          I am ready to begin
        </button>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quesPprID: state.index.paperID,
  };
};

export default connect(mapStateToProps)(Instructions);
