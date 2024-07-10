import express from "express";
import process, { env } from "process";
import weddingRoutes from "./routes/wedding";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

const origin: { [key: string]: string[] } = {
  dev: ["http://localhost:4200", "http://frontend:4000", "http://localhost"],
  // TODO: add prod url
  prod: ["http://faiza.kamalshafi.me", "https://faiza.kamalshafi.me"],
};
var environment: string = process.env.ENVIRONMENT || "prod";
if (environment !== "dev" && environment !== "prod") {
  environment = "prod";
}
var corsOptions = {
  origin: origin[environment],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.get("/", (req, res) => {
  res.status(404);
  res.render("not-found");
});

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/wedding", cors(corsOptions), weddingRoutes);

const server = app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
server.setTimeout(100000);
