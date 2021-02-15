import 'firebase/auth';

import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react';

import firebase from 'firebase/app';
import firebaseClient from '../firebaseClient';
import { useState } from 'react';

const Login = () => {
  firebaseClient();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isDisabled = !email || !password;

  return (
    <Flex>
      <Stack w={500} p={4} my={12} mx="auto" spacing={8}>
        <Heading as="h2" textAlign="center">
          Login
        </Heading>
        <FormControl isRequired>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            value={email}
          />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            value={password}
          />
        </FormControl>

        <Stack justifyContent="center" isInline spacing={10}>
          <Button
            size="lg"
            variant="solid"
            colorScheme="blue"
            isDisabled={isDisabled}
            onClick={async () => {
              await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                  window.location.href = '/';
                })
                .catch((err) => {
                  const { message } = err;
                  toast({
                    title: 'An error occurred',
                    description: message,
                    status: 'error',
                    duration: 6000,
                    isClosable: true,
                  });
                });
            }}
          >
            Create Account
          </Button>

          <Button
            size="lg"
            variant="solid"
            colorScheme="blue"
            isDisabled={isDisabled}
            onClick={async () => {
              await firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => {
                  window.location.href = '/';
                })
                .catch((err) => {
                  const { message } = err;
                  toast({
                    title: 'An error occurred',
                    description: message,
                    status: 'error',
                    duration: 6000,
                    isClosable: true,
                  });
                });
            }}
          >
            Login
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Login;
