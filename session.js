const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DB_LOCAL_URL }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.get("/", (req, res) => {
  if (req.session.count) {
    req.session.count++;
    return res.send(`${req.session.count}번째 방문입니다.`);
  }
  // count 속성 생성
  req.session.count = 1;
  return res.send("첫번째 방문입니다.");
});

app.get("/session", (req, res) => {
  const {
    sessionID,
    session: { cookie },
  } = req;
  res.send(`sessionID: ${sessionID}\ncookie: ${JSON.stringify(cookie)}`);
});

app.get("/delete-session", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      // 클라이언트 쿠키에서 sessionID를 제거
      res.clearCookie("connect.sid");
      res.send("세션 삭제");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening from http://localhost:${PORT}`);
});
