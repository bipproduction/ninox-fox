import { Box } from '@mantine/core';
import React, { useEffect } from 'react';

function Glitch() {
  return (
    <>
      <Box pos={'fixed'} style={{ 
        margin: 0,
        padding: 0,
        height: "100vh",
        width: "100vw",
        zIndex: 10000,
        backgroundColor: 'white',
        top: 0,
        left: 0,
        right: 0,
        opacity: 0.9
       }} />
    </>
  );
}

export default Glitch;
