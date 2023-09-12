import {
  UPDATE_CURRENT_INDEX,
  ANSWER,
  IS_ANSWERED,
  UNCHECKED,
  UPDATE_QUES_ARRAY,
  CHANGE_QUESTION,
  UPDATE_SECTION,
  IS_VISITED,
  SET_PAPER,
  INITIAL_ANSWER,
  SET_PAPER_ID,
  SET_SCORE,
  SET_PAPER_TYPE_ID,
  // SET_IS_CORRECT,
} from "./question.types";

export const SetPaperTypeID = (pid) => {
  return (dispatch) => {
    dispatch({ type: SET_PAPER_TYPE_ID, payload: pid });
  };
};

export const SetQuestionPaperID = (id) => {
  return (dispatch) => {
    dispatch({ type: SET_PAPER_ID, payload: id });
  };
};

export const SetQuestionPaper = (ppr) => {
  return (dispatch, getState) => {
    const { currentIndex, currentSection } = getState().index;

    const ans = {};
    const keys = Object.keys(ppr);

    keys.forEach((key) => {
      ppr[key].forEach((ques) => {
        console.log(ques);
        ques.isVisited = false;
        ques.isReviewed = false;
        ques.isAnswered = false;
        ques.isCorrect = false;
        ans[ques.qid] = -1;
        console.log(ans);
      });
    });

    ppr[currentSection][currentIndex].isVisited = true;

    dispatch({ type: SET_PAPER, payload: ppr });
    dispatch({ type: INITIAL_ANSWER, payload: ans });
  };
};

// export const SetIsCorrect = (correct) => {
//   return (dispatch, getState) => {
//     const { questions } = getState().index;
//     const ques = { ...questions };
//     const keys = Object.keys(ques);

//     keys.forEach((key) => {
//       ques[key].forEach((q) => {
//         console.log(q);
//         // if(q.qid === )

//         // q.isCorrect = true;
//       });
//     });

//     // ques[currentSection][currentIndex].isVisited = true;

//     dispatch({ type: SET_IS_CORRECT, payload: ques });
//   };
// };

export const SetAnswer = (qid, idx) => {
  return (dispatch, getState) => {
    const { answers } = getState().index;
    const ans = { ...answers };

    ans[qid] = idx;

    console.log("=============setans action", ans);

    dispatch({ type: ANSWER, payload: ans });
  };
};

// unchecked means clear response
export const Unchecked = (qid) => {
  return (dispatch, getState) => {
    const { questions, currentIndex, answers, currentSection } =
      getState().index;
    const ques = { ...questions };
    const ans = { ...answers };
    ques[currentSection][currentIndex].isAnswered = false;
    ans[qid] = -1;
    dispatch({ type: UNCHECKED, payload: { ques: ques, ans: ans } });
  };
};

export const MarkForReview = () => {
  return (dispatch, getState) => {
    const { questions, currentIndex, currentSection } = getState().index;
    const ques = { ...questions };
    ques[currentSection][currentIndex].isReviewed = true;
    dispatch({ type: UPDATE_QUES_ARRAY, payload: ques });
  };
};

export const ChangeQuestion = (idx) => {
  return (dispatch, getState) => {
    const { questions, currentSection } = getState().index;
    const question = { ...questions };
    question[currentSection][idx].isVisited = true;
    dispatch({ type: UPDATE_QUES_ARRAY, payload: question });
    dispatch({ type: CHANGE_QUESTION, payload: idx });
  };
};

export const UpdateCurrentSection = (sec) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_SECTION, payload: sec });
  };
};

export const UpdateCurrentIndex = (value) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_CURRENT_INDEX, payload: value });
  };
};

export const IsVisited = () => {
  return (dispatch, getState) => {
    const { questions, currentSection, currentIndex } = getState().index;
    const ques = { ...questions };
    ques[currentSection][currentIndex].isVisited = true;
    dispatch({ type: IS_VISITED, payload: ques });
  };
};

export const IsAnswered = () => {
  return (dispatch, getState) => {
    const { questions, currentSection, currentIndex } = getState().index;
    const ques = { ...questions };
    ques[currentSection][currentIndex].isAnswered = true;
    dispatch({ type: IS_ANSWERED, payload: ques });
  };
};

export const SetScore = (score) => {
  return (dispatch) => {
    dispatch({ type: SET_SCORE, payload: score });
  };
};
