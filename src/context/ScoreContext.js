import React, { useState, createContext } from "react";

const AppContext = createContext({
  score: 0,
  count: 0,
  numberOfChoice:0,
  question: "",
  answer: "",
  setNumberOfChoice: ()=>{},
  checkAnswer: (ans) => {return false},
  newQuestion: (question, ans) => {},
});

export function AppContextProvider(props) {
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);
  const [numberOfChoice,setNumberOfChoice] = useState(0);
  const [question, setQuestion] = useState("");
  const [answer, SetAnswer] = useState("");

  function CheckAnswer(ans) {
    ans === answer ? setScore(score + 1) : setScore(score);
    setCount(count + 1);
    return ans === answer;
  }

  const newQuestion = (question, ans) => {
    setQuestion(question);
    SetAnswer(ans);
  };

  const setChoiceAmount = (num) =>{
    if (typeof num === 'number') setNumberOfChoice(num)
  }

  const context = {
    score: score,
    count: count,
    numberOfChoice:numberOfChoice,
    question: question,
    answer: answer,
    checkAnswer: CheckAnswer,
    newQuestion: newQuestion,
    setNumberOfChoice:setChoiceAmount
  };

  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
}

export default AppContext;
