const express = require("express");
const app = express();
app.use(require("../src").default());
app.listen(4000);
