import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import dotenv from "dotenv"
dotenv.config()

// Rutele
import authRouter from "./routes/auth/auth-routes.js";
import adminPetsRouter from "./routes/admin/pet-routes.js";
import adminAdoptionOrderRouter from "./routes/admin/adoption_order-routes.js";
import shopPetsRouter from "./routes/shop/pets-routes.js";
import shopCartRouter from "./routes/shop/cart-routes.js";
import shopAddressRouter from "./routes/shop/address-routes.js";
import shopOrderRouter from "./routes/shop/order-routes.js";
import shopSearchRouter from "./routes/shop/search-routes.js";
import shopReviewRouter from "./routes/shop/review-routes.js";
import commonFeatureRouter from "./routes/common/feature-routes.js";
import adminStatsRoutes from './routes/admin/stats-routes.js';

// Conectare la MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => {
    console.error("MongoDB connection error: ", error);
    process.exit(1);  
  });


// Configurarea app Express
const app = express()
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({
    credentials : true,
    origin : process.env.FRONTEND_URL,
    methods : ["GET","POST","PUT","DELETE"],
    allowedHeaders : ["Content-Type", "Authorization", "Expires", "Cache-Control", "Pragma"]
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('combined'))
app.use(helmet({
    crossOriginResourcePolicy : false
}))


// Rutele aplicației
app.use("/api/auth", authRouter);
app.use("/api/admin/pets", adminPetsRouter);
app.use("/api/admin/orders", adminAdoptionOrderRouter);
app.use("/api/shop/pets", shopPetsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/common/feature", commonFeatureRouter);
app.use('/api/admin/stats', adminStatsRoutes);

// Ruta principala
app.get("/",(request,response)=>{
    ///server to client
    response.json({success: true, message : "Server is running " + PORT })
})

app.listen(PORT,()=>{
    console.log("Server is running",PORT)
})
