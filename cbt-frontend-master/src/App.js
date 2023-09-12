import "./App.css";
import React from "react";
import ExamSummary from "./pages/exam-summary";
import Instructions from "./pages/instructions";
import HomePage from "./pages/homepage";
import QuestionsScreen from "./pages/questions-screen";
import { Switch, Route } from "react-router-dom";

// import { BrowserRouter as Router } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";

import ScoreScreen from "./pages/score-screen";
import LoginPage from "./components/login";

import SignUpPage from "./components/sign-up";
import Profile from "./components/profile";
import PageNotFound from "./pages/error-page";

function App() {
  return (
    <Router>
      <div className="App fs-5">
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/auth/register" component={SignUpPage} exact />
          <Route path="/auth/login" component={LoginPage} exact />
          <Route path="/instruction" component={Instructions} exact />
          <Route path="/questionscreen/:id" component={QuestionsScreen} exact />
          <Route path="/examsummary" component={ExamSummary} exact />
          <Route path="/score-screen" component={ScoreScreen} exact />
          <Route path="/profile" component={Profile} exact />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
