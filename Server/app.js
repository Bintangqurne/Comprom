if (process.env.NODE_ENV !== "production") {
    require("dotenv").config(); // development
  }

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors');
const routerComprom = require("./routers/Comprom");

app.use(cors())

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(routerComprom)

app.use(errorHandler)

app.listen(port, () => {
    console.log("Masuk");
})