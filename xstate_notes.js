// npm install xstate
import {
  Machine,
  State,
  actions,
  assign,
  createMachine,
  interpret,
  send,
  sendParent,
  spawn,
} from 'xstate';

// ===================================== event =================================

const keyDownEvent = {
  type: 'keydown',
  key: 'Enter',
};

// ===================================== machine =================================

const myMachine = Machine(
  {
    id: 'promise',
    invoke: [
      { id: 'notifier', src: createNotifier },
      { id: 'logger', src: createLogger },
    ],
    initial: 'pending',
    context: {
      elapsed: 0,
      direction: 'east',
    },
    states: {
      unknown: {
        on: {
          '': [
            { target: 'morning', cond: 'isBeforeNoon' },
            { target: 'afternoon', cond: 'isBeforeSix' },
            { target: 'evening' },
          ],
        },
      },
      pending: {
        entry: 'alertGreen',
        meta: {
          message: 'some message',
        },
        on: {
          RESOLVE: 'resolved',
          REJECT: 'rejected',
        },
        after: {
          3000: 'failure.timeout',
        },
        states: {
          rejection: {
            meta: {
              message: 'some message',
            },
          },
          timeout: {
            meta: {
              message: 'some message',
            },
          },
        },
      },
      resolved: {
        type: 'final',
      },
      stateWithParallelChildStates: {
        type: 'parallel',
        states: {
          resource1: {
            type: 'compound',
            initial: 'pending',
            states: {
              pending: {
                on: {
                  'FULFILL.resource1': 'success',
                },
              },
              success: {
                type: 'final',
              },
            },
          },
          resource2: {
            type: 'compound',
            initial: 'pending',
            states: {
              pending: {
                on: {
                  'FULFILL.resource2': 'success',
                },
              },
              success: {
                type: 'final',
              },
            },
          },
        },
      },
      someotherstate: {
        type: 'atomic',
      },
    },
  },
  {
    actions: {
      // action implementation
      alertGreen: (context, event) => {
        alert('Green!');
      },
    },
    activities: {
      /* ... */
    },
    delays: {
      /* ... */
    },
    guards: {
      isBeforeNoon: () => true,
      isBeforeSix: () => false,
    },
    services: {
      /* ... */
    },
  }
);

console.log(myMachine.initialState);

console.log(myMachine.transition('yellow', 'TIMER'));

const nextState = myMachine.transition(myMachine.initialState, 'TIMER');

console.log(nextState.changed);

const answeredState = myMachine.transition(initialState, 'ANSWER');

console.log(answeredState.done);

console.log(answeredState.toStrings());

const jsonState = JSON.stringify(answeredState);

localStorage.setItem('app-state', jsonState);

const stateDefinition =
  JSON.parse(localStorage.getItem('app-state')) || myMachine.initialState;

const restoredState = State.create(stateDefinition);

const resolvedState = myMachine.resolveState(restoredState);

// ===================================== service =================================

const myService = interpret(myMachine).onTransition((state) =>
  console.log(state.value)
);

myService.onTransition((state) => {
  state.children.notifier;
  state.children.logger;
});

myService.start(resolvedState);

myService.send('RESOLVE');

const timeOfDayService = interpret(
  timeOfDayMachine.withContext({ time: Date.now() })
)
  .onTransition((state) => console.log(state.value))
  .start();
