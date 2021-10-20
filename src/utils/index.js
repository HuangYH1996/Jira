// 排除值为0，转换为boolean为false的情况
export const isFalsey = (value) => (value === 0 ? false : !value);

// 拷贝后修改，因为在一个函数中，改变传入的对象本身是不好的
export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    if (isFalsey(result[key])) {
      delete result[key];
    }
    return result[key];
  });
  return result;
};
