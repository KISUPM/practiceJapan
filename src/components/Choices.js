import React, { useState, useContext } from "react";
import { Box, Button, Grid, Text } from "@chakra-ui/react";
import AppContext from "../context/ScoreContext";

import classes from "./Choices.module.css";
import SetDelay from "./SetDelay";

export default function Choices(props) {
  const Quiz = useContext(AppContext);

  const [isDisable, setIsDisable] = useState(false);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const check = async (event) => {
    // console.clear();
    setIsDisable(true);
    const choice = event.target.innerHTML;
    setIsCorrect(Quiz.checkAnswer(choice));
    setIsShowAnswer(true);
    await sleep(Quiz.timeDelay * 1000);
    setIsShowAnswer(false);
    props.newQuestion();
    setIsDisable(false);
  };

  return (
    <Box position="relative">
      {isShowAnswer && (
        // {
        <Text
          color={"white"}
          border={`1px solid ${isCorrect ? "green" : "red"}`}
          bg={isCorrect ? "rgb(0,255,0,0.8)" : "rgb(255,0,0,0.8)"}
          p="20px"
          // m="20px"
          position="absolute"
          top="-50%"
          left="50%"
          transform={"translate(-50%,0%)"}
          zIndex={1}
          w="80%"
        >
          Answer = {Quiz.answer}
        </Text>
      )}
      <SetDelay />
      <Grid
        templateColumns={`repeat(${
          props.allChoice.length <= 5 ? props.allChoice.length : 5
        },1fr)`}
        w="fit-content"
        // border="1px solid red"
        gap={"10px"}
        mx="auto"
      >
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
      </Grid>
    </Box>
  );
}
