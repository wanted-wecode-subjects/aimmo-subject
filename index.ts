import express from "express";
import path from "path";
import router from "./src/routes";
import errorControl from "./src/middlewares/error.middleware";
import connect from "./src/database";
import session from "express-session";
import { User } from "./src/model/user";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./public")));

declare module "express-session" {
  interface SessionData {
    user: User;
  }
}
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

app.use(
  session({
    // HttpOnly: true,  https로 사용시에 옵션 주기
    secret: "MOCKSECRET",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24000 * 60 * 60 },
  })
);

app.use("/api", router);
app.use(errorControl);

app.listen(port, () => console.log("Express Server Start ", port));

connect().then(() => {
  console.log("Inmemory Database connected.");
});
