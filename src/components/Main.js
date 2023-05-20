/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import jsonData from "./japan-alphabet.json";

import AppContext from "../context/ScoreContext";
import Choices from "./Choices";

export default function ShowData() {
  const Quiz = useContext(AppContext);
  // console.clear();
  const [alpHirangana, setAlpHirangana] = useState([]);
  const [readHirangana, setReadHirangana] = useState([]);
  const [alpKatakana, setAlpKatakana] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [readKatakana, setReadKatakana] = useState([]);

  const [start, setStart] = useState(false);
  
  const [readAnswer, setReadAnswer] = useState("");
  const [choices, setChoices] = useState([]);

  const Hirangana = jsonData["Hirangana"];
  const Katakana = jsonData["Katakana"];

  const [questionType,setQuestionType] = useState("");

  // console.log(Hirangana);
  useEffect(() => {
    const allAlp = [];
    const allRead = [];
    for (const alp in Hirangana) {
      allAlp.push(alp);
      allRead.push(Hirangana[alp]);
    }
    setAlpHirangana(allAlp);
    setReadHirangana(allRead);
  }, [Hirangana]);

  useEffect(() => {
    const allAlp = [];
    const allRead = [];
    for (const alp in Katakana) {
      allAlp.push(alp);
      allRead.push(Katakana[alp]);
    }
    setAlpKatakana(allAlp);
    setReadKatakana(allRead);
  }, [Katakana]);
  // useEffect(() => {
  //   console.log(alpHirangana);
  //   console.log(readHirangana);
  // }, [alpHirangana, readHirangana]);
  // useEffect(() => {
  //   console.log(alpKatakana);
  //   console.log(readKatakana);
  // }, [alpKatakana, readKatakana]);

  const randomAnswer = () => {
    // console.clear();
    const alptype = Math.floor(Math.random() * 2);
    const randomIndex = Math.floor(Math.random() * 46);
    const alpRead = readHirangana[randomIndex];

    alptype===0? setQuestionType("Hirangana") : setQuestionType("Katakana");
    const q =
      alptype === 0 ? alpHirangana[randomIndex] : alpKatakana[randomIndex];
    setReadAnswer(alpRead);
    Quiz.newQuestion(q, alpRead);
    randomChoice(randomIndex);
  };

  const randomChoice = (ansIndex) => {
    const correctAnswer = readHirangana[ansIndex];
    let allChoice = [];
    let count = 0;
    do {
      const randChoiceIndex = Math.floor(Math.random() * 46);
      if (randChoiceIndex !== ansIndex) {
        allChoice.push(readHirangana[randChoiceIndex]);
        count += 1;
      }
    } while (count < Math.floor(Quiz.score/10)+1);
    allChoice.push(correctAnswer);
    allChoice = shuffleChoice(allChoice);
    // console.log(allChoice)
    setChoices(allChoice);
  };

  function shuffleChoice(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  return (
    <Box>
      {!start && (
        <Button
          colorScheme="teal"
          onClick={() => {
            randomAnswer();
            setStart(true);
          }}
        >
          Start
        </Button>
      )}
      {/* <Button onClick={randomAnswer}>Random Answer</Button> */}
      {start && (
        <Box textAlign={"center"}>
          <Box>
            <Text>Score get / All Score</Text>
            <Heading>
              <Text as="span" color="green">{Quiz.score}</Text>{" "}/{" "}
              <Text as="span" color="red">{Quiz.count}</Text>
            </Heading>
          </Box>
          <Heading fontSize={"10rem"}>{Quiz.question}</Heading>
          <Text mb="20px">({questionType})</Text>
          {/* <Text>read as {readAnswer}</Text> */}
          <Choices allChoice={choices} newQuestion={randomAnswer} />
        </Box>
      )}
    </Box>
  );
}
