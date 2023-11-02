import express from "express";
import dotenv from "dotenv";
import connect from "./db.js";
import pageRoute from "./routes/pageRoutes.js"
import userRoute from "./routes/userRoutes.js"
import blogRoute from "./routes/blogRoutes.js"
import categoryRoute from "./routes/categoryRoutes.js"
import cookieParser from "cookie-parser";
import { checkUser } from "./middlewares/authMiddleware.js";
import methodOverride from "method-override";

dotenv.config();

//connection to the DB
connect();

const app = express()
const port = process.env.PORT

//ejs template engine
app.set('view engine', 'ejs')

//static files middleware
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(methodOverride("_method", {methods: ["POST", "GET"]}))

//routes
app.use("*", checkUser)
app.use("/", pageRoute)
app.use("/users", userRoute)
app.use("/blogs", blogRoute)
app.use("/categories", categoryRoute)

app.listen(port, ()=> {
    console.log(`Application running on port: ${port}`)
})