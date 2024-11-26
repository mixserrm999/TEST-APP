const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const usersRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts");
const actionsRoutes = require("./routes/actions");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/actions", actionsRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});