const {json} = require("body-parser");
const express = require("express")
const loginRoute = require("./routes/login");
const todoRoute = require("./routes/todo");

const app = express();
const cors = require('cors');
const port = "3000"

app.use(json());
app.use(cors()); 

app.use("/",loginRoute);
app.use("/",todoRoute);


app.listen(port,()=>console.log(`server running on http://localhost:${port}`))