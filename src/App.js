import React from 'react';
import { Box, Center } from "@chakra-ui/react";
// import ShowData from './Components/Main';
import ShowData from './components/Main.js';
function App() {
  return (
    <Box userSelect={"none"} w="1oovw" p="20px" minH={"100vh"} display={"grid"} background=" #1C1C1C" color="white">
      <Center>
        <ShowData />
      </Center>
    </Box>
  );
}

export default App;
