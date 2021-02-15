import { Flex } from '@chakra-ui/react';
import React from 'react';

function Container({ children }) {
  return (
    <Flex as="main" justify="center" flexDirection="column" px={8}>
      {children}
    </Flex>
  );
}

export default Container;
