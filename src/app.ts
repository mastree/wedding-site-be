import express from "express";
import process from "process";
import weddingRoutes from "./routes/wedding";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.get("/");

app.get("/", (req, res) => {
  res.status(404);
  res.render("not-found");
});

app.use(morgan("dev"));
app.use("/wedding", weddingRoutes);

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
