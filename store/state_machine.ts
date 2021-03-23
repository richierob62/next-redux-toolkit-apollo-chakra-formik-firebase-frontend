import { Machine, interpret } from 'xstate';

export const machineConfig = {
  initial: 'Hidden',
  states: {
    Hidden: {
      on: {
        Toggle: { target: 'Shown' },
      },
    },
    Shown: {
      on: {
        Toggle: { target: 'Hidden' },
      },
    },
  },
};

export const createMachine = () => interpret(Machine(machineConfig));
