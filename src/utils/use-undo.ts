import { useCallback, useReducer, useState } from "react";

type State<T> = {
  past: T[];
  present: T;
  future: T[];
};

type Action<T> = {
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
  payload?: T;
};

const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state;
  const { payload: newPresent } = action;
  switch (action.type) {
    case UNDO: {
      if (past.length === 0) {
        return state;
      }
      const newPresent = past[past.length - 1];
      return {
        past: past.slice(0, past.length - 1),
        present: newPresent,
        future: [present, ...future],
      };
    }

    case REDO: {
      if (future.length === 0) {
        return state;
      }
      const newPresent = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: newPresent,
        future: newFuture,
      };
    }

    case SET: {
      if (present === newPresent) {
        return state;
      }
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    }

    case RESET: {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    }
  }
};

export const useUndo = <T>(initialPresent: T) => {
  // const [past, setPast] = useState<T[]>([])
  // const [present, setPresent] = useState<T>(initialPresent)
  // const [future, setFuture] = useState<T[]>([])

  // const [state, setState] = useState<{
  //   past: T[];
  //   present: T;
  //   future: T[];
  // }>({
  //   past: [],
  //   present: initialPresent,
  //   future: [],
  // });

  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  } as State<T>);

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => dispatch({ type: UNDO }), []);

  const redo = useCallback(() => dispatch({ type: REDO }), []);

  const set = useCallback(
    (newPresent: T) => dispatch({ type: SET, payload: newPresent }),
    []
  );

  const reset = useCallback(
    (initialValue: T) => dispatch({ type: RESET, payload: initialValue }),
    []
  );

  // 函数return 出去，需要使用 useCallback进行包裹
  return [state, { canUndo, canRedo, undo, redo, set, reset }];
};
