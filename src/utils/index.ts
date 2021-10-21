import { useEffect, useState } from "react";

interface Param {
  name: string;
  personId: string;
}
// 排除值为0，转换为boolean为false的情况
export const isFalsey = (value: any) => (value === 0 ? false : !value);

// 拷贝后修改，因为在一个函数中，改变传入的对象本身是不好的
export const cleanObject = (object: Param) => {
  const result: any = { ...object };
  Object.keys(result).forEach((key) => {
    if (isFalsey(result[key])) {
      delete result[key];
    }
    return result[key];
  });
  return result;
};

// custom hook debounce
export const useDebounce = (value: Param, delay?: number) => {
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
