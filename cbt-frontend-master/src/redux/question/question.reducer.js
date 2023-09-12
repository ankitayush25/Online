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
} from "./question.types";

// const questions = {
//   mathematics: [
//     {
//       section: "mathematics",
//       question:
//         "How many words starting with letter D can be formed by taking all letters from word DELHI, so that the letters are not repeated?",
//       option: [24, 46, 28, 30],
//     },
//     {
//       section: "mathematics",
//       question: "How many words starting with letter D ?",
//       option: [4, 16, 28, 30],
//     },
//   ],

//   "analitical reasoning": [
//     {
//       section: "analitical_reasoning",
//       question:
//         "Sum of ages of Anu and Bhanu is 10 years more than sum of ages of Bhanu, Chanu and Dhanu. Average age of Chanu and Dhanu is 19 years. Find the average age of Anu and Dhanu if Dhanu is 10 years elder than Chanu.",
//       option: [25, 36, 31, 30],
//     },
//     {
//       section: "analitical_reasoning",
//       question:
//         "Sum of ages of Anu and Bhanu is 10 years more than sum of ages of Bhanu, Chanu and Dhanu.",
//       option: [5, 60, 13, 30],
//     },
//   ],

//   computer: [
//     {
//       section: "computer",
//       question:
//         "The memory unit which directly communicates with the CPU is known as",
//       option: [
//         "primary memory",
//         "secondary memory",
//         "cache memory",
//         "shared memory",
//       ],
//     },
//     {
//       section: "computer",
//       question:
//         "The first instruction of bootstrap loader program of an operating system is stored in",
//       option: ["bios", "ram", "cache memory", "rom"],
//     },
//   ],

//   english: [
//     {
//       idx: 0,
//       section: "english",
//       question: "Choose the correct expression of approval:",
//       option: ["none", "damn", "rotten", "hell"],
//     },
//     {
//       section: "english",
//       question: "Choose the incorrect expression of approval:",
//       option: ["super", "damn", "rotten", "all of these"],
//     },
//     {
//       section: "english",
//       question: "Choose the correct expression of not approval:",
//       option: ["super", "damn", "rotten", "hell"],
//     },
//   ],
// };

const INITIAL_STATE = {
  paperTypeID: -1,
  paperID: -1,
  questions: {},
  currentIndex: 0,
  answers: {},
  currentSection: null,
  score: 0,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PAPER_TYPE_ID:
      return {
        ...state,
        paperTypeID: action.payload,
      };
    case SET_PAPER_ID:
      return {
        ...state,
        paperID: action.payload,
      };
    case SET_PAPER:
      return {
        ...state,
        questions: action.payload,
      };
    case INITIAL_ANSWER:
      console.log("paylod=====", action.payload);
      return {
        ...state,
        answers: action.payload,
      };

    case IS_ANSWERED:
      return {
        ...state,
        questions: action.payload,
      };

    case UPDATE_CURRENT_INDEX:
      return {
        ...state,
        currentIndex: action.payload,
      };

    case ANSWER:
      console.log(action.payload);
      return {
        ...state,
        answers: action.payload,
      };

    case UNCHECKED:
      return {
        ...state,
        questions: action.payload.ques,
        answers: action.payload.ans,
      };

    case UPDATE_QUES_ARRAY:
      return {
        ...state,
        questions: action.payload,
      };

    case CHANGE_QUESTION:
      return {
        ...state,
        currentIndex: action.payload,
      };

    case UPDATE_SECTION:
      return {
        ...state,
        currentSection: action.payload,
      };
    case IS_VISITED:
      return {
        ...state,
        questions: action.payload,
      };
    case SET_SCORE:
      return {
        ...state,
        score: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
