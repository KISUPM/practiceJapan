import {
  Box,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import AppContext from "../context/ScoreContext";

export default function SetDelay() {
  const Quiz = useContext(AppContext);

  return (
    <Box position="fixed" top="0.25rem" right="0.25rem">
      <Popover>
        <PopoverTrigger>
          <Text>Delay Setting</Text>
        </PopoverTrigger>
        <PopoverContent color="black">
          <PopoverBody>
            <Text>Set Delay (seconds)</Text>
            <NumberInput
              display={"flex"}
              defaultValue={1}
              min={0}
              step={0.25}
              onChange={(e) => {
                Quiz.setTimeDelay(Number(e));
              }}
            >
              <NumberDecrementStepper w="20%" />
              <NumberInputField
                placeholder={1}
                w="60%"
                textAlign={"center"}
                readOnly
                min={0.5}
              />
              <NumberIncrementStepper w="20%" />
            </NumberInput>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}
