import express from "express"
import dotenv from "dotenv"

import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.route.js"
import propertyRoutes from "./routes/property.route.js"
import favoriteRoutes from "./routes/favorite.route.js"

dotenv.config(); 
const app=express()

app.use(express.json())
app.use(cookieParser())

app.use("/auth", authRoutes)
app.use("/property", propertyRoutes)
app.use("/favorite", favoriteRoutes)

app.listen(3000)




