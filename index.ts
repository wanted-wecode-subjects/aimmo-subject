import express from "express";

import router from "./src/routes";
import errorControl from "./src/middlewares/error.middleware";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

app.use(errorControl);

app.listen(port, () => console.log("Express Server Start ", port));
