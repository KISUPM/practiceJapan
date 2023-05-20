import React, { useState, useContext } from "react";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import AppContext from "../context/ScoreContext";

import classes from "./Choices.module.css";

export default function Choices(props) {
  const Quiz = useContext(AppContext);

  const [isDisable, setIsDisable] = useState(false);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const check = async (event) => {
    console.clear();
    setIsDisable(true);
    const choice = event.target.innerHTML;
    setIsCorrect(Quiz.checkAnswer(choice));
    setIsShowAnswer(true);
    await sleep(3000);
    setIsShowAnswer(false);
    props.newQuestion();
    setIsDisable(false);
  };

  return (
    <Box>
      {isShowAnswer && (
        <Text
          color={isCorrect ? "green" : "red"}
          border={`1px solid ${isCorrect ? "green" : "red"}`}
          p="20px"
          m="20px"
        >
          Answer = {Quiz.answer}
        </Text>
      )}
      <HStack justifyContent={"center"}>
        {props.allChoice.map((i, index) => {
          return (
            <Button
              className={classes.choice}
              isDisabled={isDisable}
              onClick={check}
              key={index}
            >
              {props.allChoice[index]}
            </Button>
          );
        })}
      </HStack>
    </Box>
  );
}
