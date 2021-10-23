module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    // 写一个假的鉴权
    if (req.body.username === "jack" && req.body.password === "123456") {
      return res.status(200).json({
        user: {
          token: "123",
        },
      });
    } else {
      return res.status(400).json({
        errorMessage: "请输入正确的用户名/密码",
      });
    }
  }
  next();
};
