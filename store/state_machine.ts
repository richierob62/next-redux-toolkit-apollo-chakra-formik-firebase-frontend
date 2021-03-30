import { MachineConfig } from 'xstate';

export const machineDefinition: MachineConfig<
  UIContext,
  UIStateSchema,
  UIEvents
> = {
  initial: 'idle',
  states: {
    idle: {
      on: {
        FETCH: 'pending',
      },
    },
    pending: {
      onEntry: 'getPosts',
      on: {
        FULFILL: 'fulfilled',
        REJECT: 'rejected',
      },
    },
    rejected: {
      onEntry: 'showErrorMessage',
      on: {
        FETCH: 'pending',
      },
    },
    fulfilled: {
      onEntry: 'updateData',
    },
  },
};

export interface UIStateSchema {
  states: {
    idle: {};
    pending: {};
    rejected: {};
    fulfilled: {};
  };
}

export type UIEvents =
  | { type: 'FETCH' }
  | { type: 'FULFILL' }
  | { type: 'REJECT' };

export interface UIContext {}
