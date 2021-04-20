import { Box, Button, Text } from '@chakra-ui/react';

import React from 'react';

export interface FileHeaderProps {
  file: File;
  onDelete: (file: File) => void;
}

export function FileHeader({ file, onDelete }: FileHeaderProps) {
  return (
    <Box mb={2}>
      <Text fontSize="xs" mb={2}>
        {file.name}
      </Text>
      <Button size="xs" onClick={() => onDelete(file)}>
        Delete
      </Button>
    </Box>
  );
}
