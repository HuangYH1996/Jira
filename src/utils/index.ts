import { useEffect, useRef, useState } from "react";

// 排除值为0，转换为boolean为false的情况
export const isFalsey = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

// 拷贝后修改，因为在一个函数中，改变传入的对象本身是不好的
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    if (isVoid(result[key])) {
      delete result[key];
    }
    return result[key];
  });
  return result;
};

// custom hook debounce
// 用泛型来规范类型
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // 每次在value变化以后，设置一个定时器ß
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // 执行当前effect时，对上一个effect进行清除
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // TODO 依赖项里如果加上callback会造成无限循环，这个和useCallback以及useMemo有关系
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useArray = <T>(persons: T[]) => {
  const [value, setValue] = useState(persons);
  const clear = () => {
    setValue([] as T[]);
  };
  const removeIndex = (index: number) => {
    let copy = [...value];
    // copy.shift()
    copy.splice(index, 1);
    setValue([...copy]);
  };
  const add = (p: T) => {
    let copy = [...value];
    copy.push(p);
    setValue([...copy]);
  };
  return { value, clear, removeIndex, add };
};

export const useDocumentTitle = (title: string, keepOnUnmount?: boolean) => {
  const oldTitle = useRef(document.title).current;
  console.log("渲染时的oldTitle：", oldTitle);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
        console.log("卸载时的oldTitle：", oldTitle);
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

export const resetRoute = () => (window.location.href = window.location.origin);
