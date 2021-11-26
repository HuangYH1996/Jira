import { useCallback, useState } from "react";

export const useUndo = <T>(initialPresent: T) => {
  // const [past, setPast] = useState<T[]>([])
  // const [present, setPresent] = useState<T>(initialPresent)
  // const [future, setFuture] = useState<T[]>([])
  const [state, setState] = useState<{
    past: T[];
    present: T;
    future: T[];
  }>({
    past: [],
    present: initialPresent,
    future: [],
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    setState((prevState) => {
      const { past, present, future } = prevState;
      if (past.length === 0) {
        return prevState;
      }
      const newPresent = past[past.length - 1];
      return {
        past: past.slice(0, past.length - 1),
        present: newPresent,
        future: [present, ...future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((prevState) => {
      const { past, present, future } = prevState;
      if (future.length === 0) {
        return prevState;
      }
      const newPresent = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: newPresent,
        future: newFuture,
      };
    });
  }, []);

  const set = useCallback((newPresent: T) => {
    setState((prevState) => {
      const { past, present } = prevState;
      if (present === newPresent) {
        return prevState;
      }
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  const reset = useCallback((initialValue: T) => {
    setState({
      past: [],
      present: initialValue,
      future: [],
    });
  }, []);

  // 函数return 出去，需要使用 useCallback进行包裹
  return [state, { canUndo, canRedo, undo, redo, set, reset }];
};
