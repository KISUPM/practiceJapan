import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useContext } from "react";
import AppContext from "../context/ScoreContext";
export default function ResetButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Score = useContext(AppContext);
  return (
    <Box>
      <Button colorScheme="red" onClick={onOpen}>
        Reset
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Text>Confirm reset score?</Text>
          </ModalBody>
          <ModalFooter gap={"1rem"}>
            <Button onClick={onClose}>Close</Button>
            <Button
              onClick={() => {
                Score.resetScore();
                onClose();
              }}
              colorScheme="red"
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
