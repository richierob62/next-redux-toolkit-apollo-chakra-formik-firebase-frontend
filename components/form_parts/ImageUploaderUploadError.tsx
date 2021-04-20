import { Box, Progress, Text } from '@chakra-ui/react';

import { FileError } from 'react-dropzone';
import { FileHeader } from './ImageUploaderFileHeader';
import React from 'react';

export interface UploadErrorProps {
  file: File;
  onDelete: (file: File) => void;
  errors: FileError[];
}

export function UploadError({ file, onDelete, errors }: UploadErrorProps) {
  return (
    <Box
      background="gray.300"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="gray.400"
      padding={4}
      maxWidth="200px"
      boxShadow="md"
    >
      <FileHeader file={file} onDelete={onDelete} />
      <Progress colorScheme="red" size="sm" value={100} />
      {errors.map((error) => (
        <div key={error.code}>
          <Text fontSize="xs" color="red.500">
            {error.message}
          </Text>
        </div>
      ))}
    </Box>
  );
}
