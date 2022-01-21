export const Mark = ({ keyword, name }: { keyword: string; name: string }) => {
  // 没有搜索关键字
  if (!keyword) {
    return <>{name}</>;
  }
  const arr = name.split(keyword);
  return (
    <>
      {arr.map((str, index) => (
        <span key={index}>
          {str}
          {index === arr.length - 1 ? null : (
            <span style={{ color: "blue" }}>{keyword}</span>
          )}
        </span>
      ))}
    </>
  );
};
