require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());
app.use(require("./routes/users"));
app.use(require("./routes/checkAuth"));
app.use(require("./routes/products"));
app.use(require("./routes/cart"));
app.use(require("./routes/payment"));
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  });
app.get("/", (req, res) => {
  res.send("Server is Up and Running");
});

app.use(cors());
app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
