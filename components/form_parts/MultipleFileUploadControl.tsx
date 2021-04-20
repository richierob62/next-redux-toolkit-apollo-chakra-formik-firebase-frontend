import 'react-day-picker/lib/style.css';

import { BaseProps, FormControl } from '.';
import { Box, Text } from '@chakra-ui/react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import React, { FC, useCallback, useEffect, useState } from 'react';

import { SingleFileUploadWithProgress } from './SingleFileUploadWithProgressControl';
import { UploadError } from './ImageUploaderUploadError';
import { useField } from 'formik';

export type MultipleFileUploadControlProps = BaseProps & {};

export interface UploadableFile {
  id: number;
  file: File;
  errors: FileError[];
  url?: string;
}

let currentId = 0;

function getNewId() {
  return ++currentId;
}

export const MultipleFileUploadControl: FC<MultipleFileUploadControlProps> = (
  props: MultipleFileUploadControlProps
) => {
  const { name, label, ...rest } = props;
  const [, , { setValue }] = useField(name);

  const [files, setFiles] = useState<UploadableFile[]>([]);

  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const mappedAcc = accFiles.map((file) => ({
      file,
      errors: [],
      id: getNewId(),
    }));
    const mappedRej = rejFiles.map((r) => ({ ...r, id: getNewId() }));
    setFiles((curr) => [...curr, ...mappedAcc, ...mappedRej]);
  }, []);

  useEffect(() => {
    setValue(files);
  }, [files]);

  function onUpload(file: File, url: string) {
    setFiles((curr) =>
      curr.map((fw) => {
        if (fw.file === file) {
          return { ...fw, url };
        }
        return fw;
      })
    );
  }

  function onDelete(file: File) {
    setFiles((curr) => curr.filter((fw) => fw.file !== file));
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ['image/*', 'video/*', '.pdf'],
    maxSize: 300 * 1024, // 300KB
  });

  return (
    <Box>
      <FormControl name={name} label={label} {...rest}>
        <Box
          {...getRootProps()}
          borderWidth="2px"
          borderRadius="lg"
          display="flex"
          alignItems="center"
          justifyContent="center"
          background="gray.500"
          height="100px"
          outline="none"
          mb={2}
          color="white"
        >
          <input {...getInputProps()} />
          <Text>Drag 'n' drop some files here, or click to select files</Text>
        </Box>
        <Box
          display="flex"
          flexDir="row"
          justifyContent="space-around"
          flexWrap="wrap"
        >
          {files.map((fileWrapper) => (
            <Box item key={fileWrapper.id} margin={1}>
              {fileWrapper.errors.length ? (
                <UploadError
                  file={fileWrapper.file}
                  errors={fileWrapper.errors}
                  onDelete={onDelete}
                />
              ) : (
                <SingleFileUploadWithProgress
                  onDelete={onDelete}
                  onUpload={onUpload}
                  file={fileWrapper.file}
                />
              )}
            </Box>
          ))}
        </Box>
      </FormControl>
    </Box>
  );
};

export default MultipleFileUploadControl;
